import {Component, OnInit} from '@angular/core';
import {first, map, mapTo, scan, share, switchMap, take, takeLast} from 'rxjs/operators';
import {fromEvent, interval, merge, Observable, Subscription, zip} from 'rxjs';
import {CountDownService, FizzBuzzService} from "../../services";
import {Choice, History} from "../../models";
import {ModalController} from "@ionic/angular";
import {ModalPage} from "../modal/modal.page";

function isNumber(val: string): boolean {
    return !isNaN(Number(val));
}

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],

})
export class GamePage implements OnInit {
    countDownSubscription: Subscription;
    mistakeSubscription: Subscription;

    private nrInput$: Observable<Event>;
    private fizzInput$: Observable<Event>;
    private buzzInput$: Observable<Event>;
    private fizzBuzzInput$: Observable<Event>;

    isRunning = false;
    countDown: number;
    numbers$: Observable<number>;
    history$: Observable<History[]>;

    userScore$: Observable<number>;
    lives: number = 3;
    userLives: number = 3;
    errors$: Observable<number>;
    private currentUserScore: number;

    constructor(
        private fizzBuzzService: FizzBuzzService,
        private countDownService: CountDownService,
        private modalCtrl: ModalController
    ) {
    }

    ngOnInit() {
        this.nrInput$ = fromEvent(document.getElementById('nr-btn'), 'click');
        this.fizzInput$ = fromEvent(document.getElementById('fizz-btn'), 'click');
        this.buzzInput$ = fromEvent(document.getElementById('buzz-btn'), 'click');
        this.fizzBuzzInput$ = fromEvent(document.getElementById('fizzBuzz-btn'), 'click');
    }

    ionViewWillLeave() {
        this.stopGame()
    }

    getUserInput(): Observable<Choice> {
        this.startCountDown();
        const timerDuration = 5000;
        return merge(
            this.nrInput$.pipe(mapTo('Number')),
            this.fizzInput$.pipe(mapTo('Fizz')),
            this.buzzInput$.pipe(mapTo('Buzz')),
            this.fizzBuzzInput$.pipe(mapTo('FizzBuzz')),
            interval(timerDuration - 50).pipe(mapTo('-')),
        )
            .pipe<Choice>(
                first(null, null)
            );
    }

    startGame(): void {
        this.isRunning = true;
        const fizzBuzz$ = this.fizzBuzzService.get();
        const game$ = zip<[Choice, Choice]>(
            fizzBuzz$,
            fizzBuzz$.pipe(switchMap(() =>
                this.getUserInput()
                    .pipe(takeLast(1))
            )))
            .pipe(
                share(),
            );

        this.numbers$ = this.fizzBuzzService.getNumbers();

        const isCorrect$: Observable<boolean> = game$.pipe(
            map(([correctAnswer, givenAnswer]) => {
                return givenAnswer === correctAnswer || (isNumber(correctAnswer) && givenAnswer === 'Number');
            }));

        this.errors$ = isCorrect$.pipe(
            scan((errors, isCorrect) => {
                if (!isCorrect) {
                    errors++;
                }
                return errors;
            }, 0)
        )

        this.mistakeSubscription = this.errors$
            .subscribe((errors) => {
                if (errors >= this.lives) {
                    this.openModal(this.currentUserScore).then(r =>
                        this.mistakeSubscription.unsubscribe())
                    this.stopGame()
                }
            })

        this.userScore$ = isCorrect$.pipe(
            scan((score, isCorrect) => {
                if (isCorrect) {
                    score++;
                }
                return score;
            }, 0));
        this.userScore$.subscribe(value => {
            this.currentUserScore = value;
        })

        this.history$ = zip(
            this.numbers$,
            game$,
            isCorrect$,
            this.userScore$,
        )
            .pipe(map(([num, [correctAnswer, givenAnswer], isCorrect, score]) => {
                return {num, correctAnswer, givenAnswer, isCorrect, score} as History;
            }))
            .pipe(scan((acc: History[], historyItem) => {
                    acc.unshift(historyItem);
                    return acc;
                }, [])
            );
    }

    stopGame(): void {
        if (this.countDownSubscription) {
            this.countDownSubscription.unsubscribe();
        }
        this.isRunning = false;
    }

    startCountDown(): void {
        if (this.countDownSubscription
        ) {
            this.countDownSubscription.unsubscribe();
        }
        this.countDownSubscription = this.countDownService
            .get()
            .subscribe(response => {
                this.countDown = response;
            });
    }

    async openModal(currentUserScore: number): Promise<any> {
        console.log("passed on", currentUserScore)
        const modal = await this.modalCtrl.create({
            component: ModalPage,
            componentProps: {
                score: currentUserScore,
            }
        });
        return await modal.present();
    }

}

import {Component, OnInit} from '@angular/core';
import {first, map, mapTo, scan, share, switchMap, takeLast} from 'rxjs/operators';
import {fromEvent, interval, merge, Observable, Subscription, zip} from 'rxjs';
import {CountDownService, FizzBuzzService} from '../../services';
import {Choice, History} from '../../models';
import {ModalController} from '@ionic/angular';
import {GameEndModalPage} from '../game-end-modal/game-end-modal.page';

function isNumber(val: string): boolean {
    return !isNaN(Number(val));
}

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {
    private countDownSubscription: Subscription;
    private mistakeSubscription: Subscription;
    private userScoreSubscription: Subscription;

    private nrInput$: Observable<Event>;
    private fizzInput$: Observable<Event>;
    private buzzInput$: Observable<Event>;
    private fizzBuzzInput$: Observable<Event>;

    numbers$: Observable<number>;
    history$: Observable<History[]>;
    errors$: Observable<number>;
    userScore$: Observable<number>;

    isRunning = false;
    countDown: number;
    lives = 3;
    userLives: number = this.lives;
    currentUserScore: number;

    constructor(
        private fizzBuzzService: FizzBuzzService,
        private countDownService: CountDownService,
        private modalCtrl: ModalController,
    ) {
    }

    ngOnInit() {
        this.nrInput$ = fromEvent(document.getElementById('nr-btn'), 'click');
        this.fizzInput$ = fromEvent(document.getElementById('fizz-btn'), 'click');
        this.buzzInput$ = fromEvent(document.getElementById('buzz-btn'), 'click');
        this.fizzBuzzInput$ = fromEvent(document.getElementById('fizzBuzz-btn'), 'click');
    }

    ionViewWillLeave() {
        this.stopGame();
    }

    getUserInput(): Observable<Choice> {
        if (this.countDownSubscription) {
            this.countDownSubscription.unsubscribe();
        }
        this.countDownSubscription = this.countDownService
            .get()
            .subscribe(response => {
                console.log('countdown', response);
                this.countDown = response;
            });

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
        this.currentUserScore = 0;
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
        );

        this.mistakeSubscription = this.errors$
            .subscribe((errors) => {
                if (errors >= this.lives) {
                    this.openModal(this.currentUserScore)
                        .then(r =>
                            this.stopGame()
                        );
                }
            });

        this.userScore$ = isCorrect$.pipe(
            scan((score, isCorrect) => {
                if (isCorrect) {
                    score++;
                }
                return score;
            }, 0));

        this.userScoreSubscription = this.userScore$.subscribe(value => {
            this.currentUserScore = value;
        });

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
        if (this.mistakeSubscription) {
            this.mistakeSubscription.unsubscribe();
        }
        if (this.userScoreSubscription) {
            this.userScoreSubscription.unsubscribe();
        }
        this.isRunning = false;
        this.numbers$ = undefined;
        this.history$ = undefined;
        this.errors$ = undefined;
        this.userScore$ = undefined;
        this.currentUserScore = 0;
    }

    async openModal(currentUserScore: number): Promise<any> {
        const modal = await this.modalCtrl.create({
            component: GameEndModalPage,
            componentProps: {
                score: currentUserScore,
            }
        });
        return await modal.present();
    }

}

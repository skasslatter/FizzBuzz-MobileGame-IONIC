import {Injectable} from '@angular/core';
import {Observable, timer, zip} from 'rxjs';
import {map, share} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FizzBuzzService {
    numbers$: Observable<number>;

    constructor() {
    }

    getNumbers(): Observable<number> {
        return this.numbers$;
    }

    get(): Observable<string> {
        this.numbers$ = timer(0, 6000).pipe(
            map(n => n + 1),
            share(),
        );

        const fizz$: Observable<string> = this.getNumbers()
            .pipe(map(n => n % 3 === 0 ? 'Fizz' : '')
            );

        const buzz$: Observable<string> = this.getNumbers()
            .pipe(map(n => n % 5 === 0 ? 'Buzz' : '')
            );

        return zip(this.getNumbers(), fizz$, buzz$)
            .pipe(map(([n, fizz, buzz]) =>
                `${fizz}${buzz}` || n.toString()));
    }
}

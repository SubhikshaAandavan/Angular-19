import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
  effect,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  private destroyRef = inject(DestroyRef);
  constructor() {
    // effect(() => {
    // console.log(`Clicked Button ${this.clickCount()} Times.`);
    //});
  }
  ngOnInit(): void {
    // const subscription = interval(1000)
    // .pipe(map((val) => val * 2))
    // .subscribe({
    //  next: (val) => console.log(val),
    // });

    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked Button ${this.clickCount()} Times.`),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HighscorePage } from './highscore.page';

describe('HighscorePage', () => {
  let component: HighscorePage;
  let fixture: ComponentFixture<HighscorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighscorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HighscorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

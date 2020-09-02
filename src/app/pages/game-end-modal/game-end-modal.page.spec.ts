import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameEndModalPage } from './game-end-modal.page';

describe('ModalPage', () => {
  let component: GameEndModalPage;
  let fixture: ComponentFixture<GameEndModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameEndModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameEndModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tut1Page } from './tut1.page';

describe('Tut1Page', () => {
  let component: Tut1Page;
  let fixture: ComponentFixture<Tut1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tut1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tut1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

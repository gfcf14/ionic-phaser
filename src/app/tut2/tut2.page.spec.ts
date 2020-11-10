import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tut2Page } from './tut2.page';

describe('Tut2Page', () => {
  let component: Tut2Page;
  let fixture: ComponentFixture<Tut2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tut2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tut2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

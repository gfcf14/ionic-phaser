import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tut3Page } from './tut3.page';

describe('Tut3Page', () => {
  let component: Tut3Page;
  let fixture: ComponentFixture<Tut3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tut3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tut3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

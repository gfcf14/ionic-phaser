import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenericPage } from './generic.page';

describe('GenericPage', () => {
  let component: GenericPage;
  let fixture: ComponentFixture<GenericPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

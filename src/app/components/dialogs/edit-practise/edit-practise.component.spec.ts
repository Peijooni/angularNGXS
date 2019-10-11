import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPractiseComponent } from './edit-practise.component';

describe('EditPractiseComponent', () => {
  let component: EditPractiseComponent;
  let fixture: ComponentFixture<EditPractiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPractiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPractiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

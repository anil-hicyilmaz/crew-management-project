import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewFormModalComponent } from './crew-form-modal.component';

describe('CrewFormModalComponent', () => {
  let component: CrewFormModalComponent;
  let fixture: ComponentFixture<CrewFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

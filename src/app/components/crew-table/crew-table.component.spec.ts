import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewTableComponent } from './crew-table.component';

describe('CrewTableComponent', () => {
  let component: CrewTableComponent;
  let fixture: ComponentFixture<CrewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

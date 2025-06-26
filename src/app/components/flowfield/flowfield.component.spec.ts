import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowfieldComponent } from './flowfield.component';

describe('FlowfieldComponent', () => {
  let component: FlowfieldComponent;
  let fixture: ComponentFixture<FlowfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowfieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

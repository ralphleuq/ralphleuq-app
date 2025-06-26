import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimangTvComponent } from './timang-tv.component';

describe('TimangTvComponent', () => {
  let component: TimangTvComponent;
  let fixture: ComponentFixture<TimangTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimangTvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimangTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

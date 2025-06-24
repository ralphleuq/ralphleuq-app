import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerlinComponent } from './perlin.component';

describe('PerlinComponent', () => {
  let component: PerlinComponent;
  let fixture: ComponentFixture<PerlinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerlinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerlinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

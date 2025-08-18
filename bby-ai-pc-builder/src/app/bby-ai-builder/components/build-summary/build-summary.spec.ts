import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildSummary } from './build-summary';

describe('BuildSummary', () => {
  let component: BuildSummary;
  let fixture: ComponentFixture<BuildSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbyAiBuilder } from './bby-ai-builder';

describe('BbyAiBuilder', () => {
  let component: BbyAiBuilder;
  let fixture: ComponentFixture<BbyAiBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BbyAiBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbyAiBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

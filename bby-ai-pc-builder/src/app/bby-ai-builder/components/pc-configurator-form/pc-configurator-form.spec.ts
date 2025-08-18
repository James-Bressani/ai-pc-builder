import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcConfiguratorForm } from './pc-configurator-form';

describe('PcConfiguratorForm', () => {
  let component: PcConfiguratorForm;
  let fixture: ComponentFixture<PcConfiguratorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PcConfiguratorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcConfiguratorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

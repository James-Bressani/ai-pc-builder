import { TestBed } from '@angular/core/testing';

import { ConfiguratorState } from './configurator-state';

describe('ConfiguratorState', () => {
  let service: ConfiguratorState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguratorState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

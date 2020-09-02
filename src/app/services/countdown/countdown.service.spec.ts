import { TestBed } from '@angular/core/testing';

import { CountDownService } from './countdown.service';

describe('CountdownService', () => {
  let service: CountDownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountDownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

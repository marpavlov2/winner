import { TestBed } from '@angular/core/testing';

import { MainContractService } from './main-contract.service';

describe('MainContractService', () => {
  let service: MainContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PagesMockService } from './pages-mock.service';

describe('PagesMockService', () => {
  let service: PagesMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

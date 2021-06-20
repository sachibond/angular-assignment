import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';

import { ServerService } from './server.service';
import { MOCK_FILTER_INPUT, MOCK_SERVER } from './server.service.mock';
import { SERVER_URL } from '../constant/serverConstant';

describe('ServerService', () => {
  let httpTestingController: HttpTestingController;
  let service: ServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServerService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ServerService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should call http get server', () => {
    service.getServerDetail().subscribe((data) => {
      expect(MOCK_SERVER).toEqual(data);
    });
    const req = httpTestingController.expectOne(SERVER_URL);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(MOCK_SERVER);
  });

  it('it should call http get server with filter', () => {
    service.getFilterServerDetail(MOCK_FILTER_INPUT).subscribe((data) => {
      expect(MOCK_SERVER).toEqual(data);
    });

    const req = httpTestingController.expectOne(
      `${SERVER_URL}?storageMin=${MOCK_FILTER_INPUT.sliderControl[0]}&storageMax=${MOCK_FILTER_INPUT.sliderControl[1]}&ram=${MOCK_FILTER_INPUT.ramChoice[0]}&hdd=${MOCK_FILTER_INPUT.hddChoice[0]}&location=${MOCK_FILTER_INPUT.locationChoice[0]}`
    );

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(MOCK_SERVER);
  });
});

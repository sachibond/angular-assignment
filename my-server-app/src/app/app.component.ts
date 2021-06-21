import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';

import {
  CheckboxSelection,
  Server,
  ServerData,
} from './interfaces/server.interface';
import { ServerService } from './services/server.service';
import {
  RAM,
  HDD,
  LOCATION,
  PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  ZERO,
} from './constant/serverConstant';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public ram = RAM;
  public hddData = HDD;
  public location = LOCATION;
  public serverDetail: ServerData[] = [];
  public pageSlice: ServerData[] = [];
  public pageSize = PAGE_SIZE;
  public pageSizeOption = PAGE_SIZE_OPTIONS;
  public options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 0, legend: 'GB' },
      { value: 250, legend: 'GB' },
      { value: 500, legend: 'GB' },
      { value: 1, legend: 'TB' },
      { value: 2, legend: 'TB' },
      { value: 3, legend: 'TB' },
      { value: 4, legend: 'TB' },
      { value: 8, legend: 'TB' },
      { value: 12, legend: 'TB' },
      { value: 24, legend: 'TB' },
      { value: 48, legend: 'TB' },
      { value: 72, legend: 'TB' },
    ],
  };
  public ramArray: FormArray[] = [];
  public showSpinner: boolean = false;
  private _subscription: Subscription = new Subscription();

  myForm = new FormGroup({
    sliderControl: new FormControl([ZERO, ZERO]),
    ramChoice: new FormArray([]),
    hddChoice: new FormControl(),
    locationChoice: new FormControl(),
  });
  constructor(
    private _serverService: ServerService,
    private _ref: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.showSpinner = true;
    this._subscription.add(
      this._serverService.getServerDetail().subscribe(
        (data: Server) => {
          this.serverDetail = data.servers;
          this.pageSlice = this.serverDetail.slice(ZERO, this.pageSize);
          this.showSpinner = false;
          this._ref.markForCheck();
        },
        (err) => {
          this.showSpinner = false;
          console.log('HTTP Error', err);
        }
      )
    );
  }

  public onChange(data: CheckboxSelection, event: boolean): void {
    const ramArray: FormArray = <FormArray>this.myForm.get('ramChoice');

    if (event) {
      ramArray.push(new FormControl(data.value));
    } else {
      let index = ramArray.controls.findIndex((x) => x.value === data.value);
      ramArray.removeAt(index);
    }
  }

  public onPageChnage(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.serverDetail.length) {
      endIndex = this.serverDetail.length;
    }
    this.pageSlice = this.serverDetail.slice(startIndex, endIndex);
  }

  public submitForm(): void {
    this._subscription.add(
      this._serverService.getFilterServerDetail(this.myForm.value).subscribe(
        (data) => {
          this.serverDetail = data.servers;
          this.pageSlice = this.serverDetail.slice(ZERO, this.pageSize);

          this._ref.markForCheck();
        },
        (err) => console.log('HTTP Error', err)
      )
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}

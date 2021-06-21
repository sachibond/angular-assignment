import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServerService } from './services/server.service';
import {  MOCK_SERVER } from './services/server.service.mock';
import { of } from 'rxjs';


describe('AppComponent', () => {
  let serverService: jasmine.SpyObj<ServerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AppComponent],
      providers: [ServerService],
    }).overrideComponent(AppComponent,{set: {template: ''}})
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call server service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const service = fixture.debugElement.injector.get(ServerService);
    spyOn(service, 'getServerDetail').and.returnValue(of(MOCK_SERVER));
    app.ngOnInit();
    expect(service.getServerDetail).toHaveBeenCalled();
  });

  it('should call submit methos', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const service = fixture.debugElement.injector.get(ServerService);
    spyOn(service, 'getFilterServerDetail').and.returnValue(of(MOCK_SERVER));
    app.submitForm();
    expect(service.getFilterServerDetail).toHaveBeenCalled();
  });
});

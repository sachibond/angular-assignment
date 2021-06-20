import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServerService } from './services/server.service';
import { MOCK_CHECKBOX_SELECTION } from './services/server.service.mock';

describe('AppComponent', () => {
  let serverService: jasmine.SpyObj<ServerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AppComponent],
      providers: [ServerService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

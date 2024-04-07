import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHandlingDemoComponent } from './error-handling-demo.component';

describe('ErrorHandlingDemoComponent', () => {
  let component: ErrorHandlingDemoComponent;
  let fixture: ComponentFixture<ErrorHandlingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHandlingDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorHandlingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

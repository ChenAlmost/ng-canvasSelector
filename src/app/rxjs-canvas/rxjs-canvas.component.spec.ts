import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsCanvasComponent } from './rxjs-canvas.component';

describe('RxjsCanvasComponent', () => {
  let component: RxjsCanvasComponent;
  let fixture: ComponentFixture<RxjsCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

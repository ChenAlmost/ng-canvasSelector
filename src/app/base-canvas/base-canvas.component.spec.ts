import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCanvasComponent } from './base-canvas.component';

describe('BaseCanvasComponent', () => {
  let component: BaseCanvasComponent;
  let fixture: ComponentFixture<BaseCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
interface Area {
  active: boolean;
  pointCollection: DragPoint[];
}

interface DragPoint {
  x: number;
  y: number;
  radius: number;
}

@Component({
  selector: 'app-rxjs-canvas',
  templateUrl: './rxjs-canvas.component.html',
  styleUrls: ['./rxjs-canvas.component.css']
})
export class RxjsCanvasComponent implements OnInit {

  @ViewChild('customCanvas')
  customCanvas: ElementRef;
  context: CanvasRenderingContext2D;
  isDragging = false;
  dragIndex = -1;
  areaArray: Area[] = [];
  currentArea: Area;

  mousedownObs: Observable<MouseEvent>;
  mousemoveObs: Observable<MouseEvent>;
  mouseupObs: Observable<MouseEvent>;
  rightClickObs: Observable<MouseEvent>;
  constructor() { }

  ngOnInit() {
    const canvasElement = this.customCanvas.nativeElement;
    this.context = (<HTMLCanvasElement>canvasElement).getContext('2d');
    this.formatMousedownObs(canvasElement);
    this.mousedownObs.subscribe(res => {
      console.log('mouse down obs...', res);
    })
  }

  formatObservables() {
    const canvasElement = this.customCanvas.nativeElement;
    this.mousedownObs = fromEvent(canvasElement, 'mousedown');
    this.mouseupObs = fromEvent(canvasElement, 'mouseup');
    this.mousemoveObs = fromEvent(canvasElement, 'mousemove');
  }

  formatMousedownObs(canvasElement: any) {
    this.mousedownObs = fromEvent(canvasElement, 'mousedown').pipe(
      filter((e: MouseEvent) => e.button !== 2)
    )
  }

  ngAfterViewInit() {
    this.context = (<HTMLCanvasElement>this.customCanvas.nativeElement).getContext('2d');
    this.addNewArea();
    // fromEvent(this.customCanvas.nativeElement, 'click').subscribe(res => {
    //   console.log('res....', res);
    // });
  }

  onMouseDown(event: MouseEvent) {
    if (event.button === 2) {
      return;
    }
    const x = event.offsetX;
    const y = event.offsetY;
    this.currentArea.pointCollection.forEach((p, index) => {
      const existPoint = this.checkTarget(p, x, y);
      if (existPoint) {
        this.isDragging = true;
        this.dragIndex = index;
      }
    });
    if (this.isDragging) {
      return;
    }
    this.currentArea.pointCollection.push({ x, y, radius: 4 });
    this.isDragging = true;
    this.dragIndex = this.currentArea.pointCollection.length - 1;
    this.reDraw();
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }

  onmouseMove(event: MouseEvent) {
    // console.log('mouse move event...', event);
    if (this.isDragging) {
      const x = event.offsetX;
      const y = event.offsetY;
      const radius = this.currentArea.pointCollection[this.dragIndex].radius
      const minX = radius;
      const maxX = (<HTMLCanvasElement>this.customCanvas.nativeElement).width - radius;
      const minY = radius;
      const maxY = (<HTMLCanvasElement>this.customCanvas.nativeElement).height - radius;
      const posX = x < minX ? minX : (x > maxX ? maxX : x);
      const posY = y < minY ? minY : (y > maxY ? maxY : y);
      this.currentArea.pointCollection[this.dragIndex].x = posX;
      this.currentArea.pointCollection[this.dragIndex].y = posY;
      this.reDraw();
    }
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    console.log('right click....');
    const x = event.offsetX;
    const y = event.offsetY;
    this.currentArea.pointCollection.forEach((p, imdex) => {
      const existPoint = this.checkTarget(p, x, y);
      if (existPoint) {
        this.currentArea.pointCollection.splice(imdex, 1);
        this.reDraw();
      }
    });
    return false;
  }

  reDraw() {
    this.context.canvas.width = this.context.canvas.width;
    this.areaArray.forEach(a => {
      this.drawPath(a);
    })
  }

  drawPath(area: Area) {
    console.log('draw path invoked....');

    if (area.active) {
      const activePoints = area.pointCollection;
      this.drawPoint(activePoints);
    }
    this.context.globalCompositeOperation = 'destination-over';
    this.context.fillStyle = 'rgb(255,255,255)';
    this.context.strokeStyle = 'rgb(255,20,20)';
    this.context.lineWidth = 1;
    this.context.beginPath();
    area.pointCollection.forEach((p, index) => {
      if (index === 0) {
        this.context.moveTo(p.x, p.y);
      } else {
        this.context.lineTo(p.x, p.y);
      }
    });
    this.context.closePath();
    this.context.fillStyle = 'rgba(255,0,0,0.3)';
    this.context.fill();
    this.context.stroke();
  };

  drawPoint(points: DragPoint[]) {
    points.forEach(p => {
      this.context.fillStyle = 'rgb(255,20,20)';
      this.context.strokeStyle = 'rgb(255,20,20)';
      this.context.lineWidth = 1;
      this.context.beginPath();
      this.context.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
      this.context.fill();
      this.context.stroke();
      this.context.closePath();
    });
  }

  checkTarget(p: DragPoint, targetX: number, targetY: number) {
    if (!!!p) {
      return false;
    }
    const dx = targetX - p.x; // distance between mouse and point
    const dy = targetY - p.y;
    const inRange = dx * dx + dy * dy < p.radius * p.radius;
    return inRange;
  }

  addNewArea() {
    if (this.currentArea && this.currentArea.active) {
      this.currentArea.active = false;
    }
    const tempArea: Area = { active: true, pointCollection: [] };
    this.areaArray.push(tempArea);
    this.currentArea = tempArea;
    this.reDraw();
  }

  submit() {
    console.log('submit...', this.areaArray);
  }
}

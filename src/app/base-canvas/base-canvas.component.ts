import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-base-canvas',
  templateUrl: './base-canvas.component.html',
  styleUrls: ['./base-canvas.component.css']
})
export class BaseCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('customCanvas')
  customCanvas: ElementRef;
  context: CanvasRenderingContext2D;
  pointArray: Array<{ x: number; y: number }> = [];
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.context = (<HTMLCanvasElement>this.customCanvas.nativeElement).getContext('2d');
    console.log(this.context);
  }

  onMouseDown(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;

    this.pointArray.push({ x, y });
    this.drawPath(this.pointArray);
  }

  onmouseMove(event: MouseEvent) {
    console.log('mouse move event...', event);
  }

  drawPoint(p: { x: number, y: number }) {

    this.context.fillRect(p.x - 4, p.y - 4, 8, 8);
    this.context.strokeRect(p.x - 4, p.y - 4, 8, 8);
  }

  drawPath(points: Array<{ x: number; y: number }>) {
    this.context.canvas.width = this.context.canvas.width;
    this.context.globalCompositeOperation = 'destination-over';
    this.context.fillStyle = 'rgb(255,255,255)';
    this.context.strokeStyle = 'rgb(255,20,20)';
    this.context.lineWidth = 1;
    this.context.beginPath();
    points.forEach((p, index) => {
      this.drawPoint(p);
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
  }
}

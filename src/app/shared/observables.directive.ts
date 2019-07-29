import { Directive, OnInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export class ObservableContext {
  [key: string]: any
}

@Directive({
  selector: '[appObservables]'
})
export class ObservablesDirective implements OnInit {
  private _context = new ObservableContext();

  @Input()
  set observablesFrom(value: any) {
    Object.assign(this._context, value);
  }

  constructor(
    private template: TemplateRef<ObservableContext>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.template, this._context);
  }
}

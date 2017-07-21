import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[spAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) {
    console.log('DIRECTIVE');
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();//On ne peut pas mettre dans le constructeur car la page n'est pas encore chargée à ce moment
  }

}

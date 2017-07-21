import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";

export const clickOutside = 'clickOutside';
export const pressEscape = 'pressEscape';

@Component({
  selector: 'sp-popin',
  templateUrl: './popin.component.html',
  styleUrls: ['./popin.component.scss']
})
export class PopinComponent implements OnInit {

  // Fait référence à l'élément HTML class="popin" : la div blanche
  @ViewChild('popin') popin: ElementRef;

  @Output() exit = new EventEmitter<string>();

  constructor(private renderer: Renderer2,
              private popinComplete: ElementRef) { }// element est ici le composant COMPLET (div blanche + fond sombre)

  ngOnInit() {
    // this.renderer.listen(document, 'click', e => this.popin.nativeElement.);
    // Si on clique sur la popin (blanche), on stoppe la propagation de l'evt
    this.renderer.listen(this.popin.nativeElement, 'click', e => e.stopPropagation());

    // Si on clique sur la popin complète (blanche ou grise), on emet l'evt exit
    this.renderer.listen(this.popinComplete.nativeElement, 'click', e => this.exit.emit(clickOutside));

    // Si on clique sur la popin complète (blanche ou grise), on emet l'evt exit
    this.renderer.listen(document, 'keydown.Escape', e => this.exit.emit(pressEscape));

    // this.renderer.listen(document, 'exit', e => console.log(e));
    // this.renderer.listen(document, 'keydown', e => {
    //   if (e.key === 'Escape') {
    //     this.exit.emit();
    //   }
    // });
    // const clickOnPopin$ = Observable.fromEvent(this.element.nativeElement, 'mouseDown');
  }



}

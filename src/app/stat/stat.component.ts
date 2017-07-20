import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import {ResizeGraphService} from "./visualization/resize-graph.service";

@Component({
  selector: 'sp-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
  providers: [ResizeGraphService]
})
export class StatComponent implements OnInit {

  @ViewChild('leftBlock') leftBlock: ElementRef;
  @ViewChild('separator') separator: ElementRef;
  @ViewChild('rightBlock') rightBlock: ElementRef;

  constructor(private elementRef: ElementRef,
              private resizeGraphService: ResizeGraphService) { }




  ngOnInit() {
    const mouseDown$ = Observable.fromEvent(this.separator.nativeElement, 'mousedown');

    const mouseMove$ = Observable.fromEvent(document, 'mousemove');// sur le document ce coup ci (le mouse move se fera sur le doc)
    //mouseMove$.subscribe(e => console.log(e));

    const mouseUp$ = Observable.fromEvent(document, 'mouseup');// sur le document ce coup ci
    //mouseUp$.subscribe(e => console.log(e));



    //E1 : on écoute sur mouse down
    //mouseDown.subscribe()

    //E2 : on ne veut lancer l'observation du mouseMove QUE SI mouseDown a été lancé
    //ATTENTION : observables d'observables => PAS BIEN : on "flatten" tout ça avec mergeMap
    // mouseDown$.mergeMap(e => mouseMove$).subscribe()

    //E3 : On n'écoute mouseMove JUSQU'A CE QUE mouseUp soit lancé
    // mouseDown$.mergeMap(e => mouseMove$.takeUntil(mouseUp$)).subscribe()

    mouseDown$.mergeMap(e => mouseMove$.takeUntil(mouseUp$)).subscribe((e: MouseEvent) => {
      const widths = this.getBlocksWidth(e.x);
      this.rightBlock.nativeElement.setAttribute('style', `width: ${widths.rightWidth}px;`);
      this.leftBlock.nativeElement.setAttribute('style', `width: ${widths.leftWidth}px;`);

      this.resizeGraphService.setWidth(widths.rightWidth);
    });

    // TODO exo-obs


    const separatorRec = this.separator.nativeElement.getBoundingClientRect();
    const blocksWidth = this.getBlocksWidth(separatorRec.left + separatorRec.width / 2);
    this.resizeGraphService.setWidth(blocksWidth.rightWidth);
  }

  private getBlocksWidth(mouseX: number): {leftWidth, rightWidth} {
    const rectContainer = this.elementRef.nativeElement.getBoundingClientRect();
    const marginAndPaddingSeparator = 7;
    const leftWidth = mouseX - rectContainer.left - marginAndPaddingSeparator;
    const rightWidth = rectContainer.width + rectContainer.left - mouseX - marginAndPaddingSeparator;
    return {leftWidth, rightWidth};
  }

}

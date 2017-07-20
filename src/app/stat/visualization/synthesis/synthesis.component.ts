import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecordStoreService} from "../../record-store.service";
import {Observable} from "rxjs/Observable";
import {Record} from "../../../shared/record/record";
import 'rxjs/add/operator/reduce'
import 'rxjs/add/operator/max'
import 'rxjs/add/operator/min'
import 'rxjs/add/operator/last'
import 'rxjs/add/observable/from'
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'sp-synthesis',
  templateUrl: './synthesis.component.html',
  styleUrls: ['./synthesis.component.scss']
})
export class SynthesisComponent implements OnInit, OnDestroy {

  record$: Observable<Record>;

  recordSub: Subscription;
  durationSub: Subscription;
  maxSub: Subscription;

  // EQUIVALENT POUR DESTRUCTION OBSERVABLES
  // // // destroyObservables = new Subject<void>();

  constructor(private recordStoreService: RecordStoreService) { }

  ngOnInit() {
    this.record$ = this.recordStoreService.getSelectedRecord$();



  //  this.recordSub = this.getType$().subscribe(x => console.log(x));
  //  this.durationSub = this.getDuration$().subscribe(x => console.log(x));
  //  this.maxSub = this.getMax$().subscribe(x => console.log(x));
//
  //  // EQUIVALENT POUR DESTRUCTION OBSERVABLES
  //  //this.getType$().takeUntil(this.destroyObservables).subscribe(x => console.log(x));
  //  this.getType$().takeUntil(this.destroyObservables).subscribe(x => console.log(x));
  //  this.getType$().takeUntil(this.destroyObservables).subscribe(x => console.log(x));
  }

  ngOnDestroy(): void {
   // this.recordSub.unsubscribe();
   // this.durationSub.unsubscribe();
   // this.maxSub.unsubscribe();

   // // // EQUIVALENT POUR DESTRUCTION OBSERVABLES
   // // this.destroyObservables.next();
   // // this.destroyObservables.complete();// On complete cet observable ensuite >> Pas besoin de s'en désabonner !
  }

  getType$(): Observable<string> {
    return this.record$.filter(record => record != null).map(record => {
      if (!record) {// rendu non nécessaire par le filter, qui fait la mm chose
        return null;
      }
      return record.type;
    });
  }

  getDuration$(): Observable<any> {
    //  const lastElement = this.record$.map(record => {
    //  if (!record) {
    //    return null;
    //  }
    //  return record.heartBeats[record.heartBeats.length - 1].x.toString();
    //  });

    //  return lastElement;


    // EQUIVALENT DU DESSOUS
    //  return this.record$.filter(record => record != null).
    //  map(record => record.heartBeats).
    //  map(heartBeats => heartBeats[heartBeats.length - 1]).
    //  map(heartBeat => heartBeat.x).
    //  map(max => `${Math.floor(max / 60)}''${max % 60}`);

    return this.record$.filter(record => record != null).
      mergeMap(record => Observable.from(record.heartBeats)).last().
      map(heartBeat => heartBeat.x);

    //              Click user          Click user          Click user
    //   --------------O-------------------O--------------------O---------------->
    // Pour chaque click, on lance un evt sur l'observable, qui est un observable sur un record
    // On ne veut garder que les infos sur le tableau "heartBeats" >> MAP
    // Pour chaque "O", on a donc une liste de petits observables (sur heartBeats) >> mergeMap



  }

  getMax$(): Observable<number> {
    //  const max = this.record$.filter(record => record != null).map(record => record.heartBeats)
    //  .//map(heartBeats => {
    //
    //
    //    let test = 0;
    //    for (let i = 0; i < heartBeats.length ; i++) {
    //      if (test < heartBeats[i].y) {
    //        test = heartBeats[i].y;
    //      }
    //    }
    //    return test;
    //  }, 0);

    // return max;

    // ATTENTION : il faut travailler DANS le mergeMap car il retourne un observable qui ne se finit jamais (on écoute toujours sur les clicks du user)
    return this.record$.filter(record => !!record).
      mergeMap(record => Observable.from(record.heartBeats).map(heartBeats => heartBeats.y).max());


  }

  getMin$(): Observable<number> {
    return this.record$.filter(record => !!record).
    mergeMap(record => Observable.from(record.heartBeats).map(heartBeats => heartBeats.y).min());
  }

  getAverage$(): Observable<number> {

    function cumulPourMapReduce(cumul, y){
      return {
        sum: cumul.sum + y,
        nbElements : cumul.nbElements + 1
      }
    }

    return this.record$.filter(record => !!record).
      mergeMap(record => Observable.from(record.heartBeats).
      map(heartBeats => heartBeats.y).
      reduce((cumul, y) => cumulPourMapReduce(cumul, y), {sum: 0, nbElements: 0})).
      map(objSortieReduce => objSortieReduce.sum / objSortieReduce.nbElements);
  }
}

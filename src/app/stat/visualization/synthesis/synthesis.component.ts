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

@Component({
  selector: 'sp-synthesis',
  templateUrl: './synthesis.component.html',
  styleUrls: ['./synthesis.component.scss']
})
export class SynthesisComponent implements OnInit, OnDestroy {

  record$: Observable<Record>;

  constructor(private recordStoreService: RecordStoreService) { }

  ngOnInit() {
    this.record$ = this.recordStoreService.getSelectedRecord$();
  }

  ngOnDestroy(): void { }

  getType$(): Observable<string> {
    return null;
  }

  getDuration$(): Observable<string> {
    return null;
  }

  getMax$(): Observable<number> {
    return null;
  }

  getMin$(): Observable<number> {
    return null;
  }

  getAverage$(): Observable<number> {
    return null
  }
}

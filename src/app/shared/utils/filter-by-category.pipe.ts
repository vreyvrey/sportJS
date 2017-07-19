import { Pipe, PipeTransform } from '@angular/core';
import {Exercice, ExerciceCategory} from "../program/exercice";
import {Record} from "../record/record";
import {Observable} from "rxjs/Observable";

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(records: Record[], cat: ExerciceCategory): Record[] {
    if (!cat || !records) {
      return records;
    }
    // return records.filter(function(record){
    //  return record.category === cat;
    // });
    return records.filter(r => r.category === cat);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseBreakLine'
})
export class ParseBreakLinePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\n/g, '<br>');// /.../g > REGEXP qui s'applique sur touts les occurences (par seulement la 1ère)
  }

}

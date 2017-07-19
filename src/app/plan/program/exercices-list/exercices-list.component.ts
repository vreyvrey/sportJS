import {Component, Input, OnInit} from '@angular/core';
import {CARDIO_TRAINING, Exercice, LESSON, REINFORCEMENT} from '../../../shared/program/exercice';

// CORRECTION
class SelectableExercice extends Exercice {
  selected: boolean;
}


@Component({
  selector: 'sp-exercices-list',
  templateUrl: './exercices-list.component.html',
  styleUrls: ['./exercices-list.component.scss']
})
export class ExercicesListComponent implements OnInit {

  @Input() exercices: SelectableExercice[];

  constructor() { }

  ngOnInit() { }

  private isLesson(index: number): boolean {
    if (this.exercices[index].category === LESSON) {
      return true;
    }
    return false;
  }

  private isCardio(index: number): boolean {
    if (this.exercices[index].category === CARDIO_TRAINING) {
      return true;
    }
    return false;
  }

  private isRenforcement(index: number): boolean {
    if (this.exercices[index].category === REINFORCEMENT) {
      return true;
    }
    return false;
  }

//  private move(index: number, exo: Exercice, futureIndex: number): void {
//    this.exercices.splice(index, 1);
//    this.exercices.splice(futureIndex, 0, exo);
//  }

  private deleteExercice(index: number): void {
    this.exercices.splice(index, 1);
  }

  private select(index: number): void {
    console.log(index + ' ' + this.exercices[index].selected);
    this.exercices[index].selected = !this.exercices[index].selected;
  }

  private hasElementsSelected(): boolean {
    let hasSelectedElement = false;
    for (let i = 0; i < this.exercices.length; i++) {
      if (this.exercices[i].selected === true) {
        hasSelectedElement = true;
      }
    }
    return hasSelectedElement;
  }

  private deleteSelectedExercices(): void {
    for (let i = this.exercices.length - 1; i >= 0; i--) {
      if (this.exercices[i].selected === true) {
        this.exercices.splice(i, 1);
      }
    }
  }


  // CORRECTION

  private moveUp(index: number, e: Event): void {
    e.stopPropagation();
    if (index < this.exercices.length - 1) {
      this.invert2Elements(index, index + 1);
    }
  }


  private moveDown(index: number, e: Event): void {
    e.stopPropagation();
    if (index > 0) {
      this.invert2Elements(index, index - 1);
    }
  }

  private invert2Elements(i: number, j: number): void {
    const temp = this.exercices[i];
    this.exercices[i] = this.exercices[j];
    this.exercices[j] = temp;
  }

  selecteExercice(exo: Exercice): void {
    exo.selected = !exo.selected;
  }
}

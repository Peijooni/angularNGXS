import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Practise } from 'src/app/models/Practise';
import { Store } from '@ngxs/store';
import { DeletePractise, InitPractises, UpdatePractise, Loading } from 'src/app/actions/practise.action';
import { MatDialog } from '@angular/material/dialog';
import { EditPractiseComponent } from '../dialogs/edit-practise/edit-practise.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  practises$: Observable<Practise>;
  loading$: Observable<boolean>;
  constructor(private store: Store, public dialog: MatDialog) {
  }

  openDialog(practise: Practise): void {
    const dialogRef = this.dialog.open(EditPractiseComponent, {
      height: '400px',
      width: '600px',
      data: practise
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.store.dispatch(new UpdatePractise(result as Practise));
      }
    });
  }

  deletePractise(id: number): void {
    this.store.dispatch(new DeletePractise(id));
  }


  ngOnInit() {
    this.store.dispatch(new InitPractises());
    this.practises$ = this.store.select(state => state.practises.practises);
    this.loading$ = this.store.select(state => state.practises.loading);
  }

}

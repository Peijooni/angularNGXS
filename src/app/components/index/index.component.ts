import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Practise } from 'src/app/models/Practise';
import { Store } from '@ngxs/store';
import { DeletePractise, InitPractises, UpdatePractise } from 'src/app/actions/practise.action';
import { MatDialog } from '@angular/material/dialog';
import { EditPractiseComponent } from '../dialogs/edit-practise/edit-practise.component';

/*
export interface DialogData {
  practise: Practise;
}
*/

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  practises$: Observable<Practise>;
  constructor(private store: Store, public dialog: MatDialog) {
  }

  openDialog(practise: Practise): void {
    const dialogRef = this.dialog.open(EditPractiseComponent, {
      height: '400px',
      width: '600px',
      data: practise
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result !== undefined) {
        this.store.dispatch(new UpdatePractise(result as Practise));
      }
    });
  }

  deletePractise(id: string): void {
    this.store.dispatch(new DeletePractise(id));
    //this.http.get('http://localhost:3000').subscribe(testi => {console.log(testi)});
  }


  ngOnInit() {
    this.store.dispatch(new InitPractises());
    this.practises$ = this.store.select(state => state.practises.practises);
  }

}
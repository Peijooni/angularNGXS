import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddPractise, InitPractises } from '../../actions/practise.action';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
   }

   createForm() {
    this.angForm = this.fb.group({
      description: ['', Validators.required ],
      date: ['', Validators.required ]
   });
  }

  addPractise(description: string, date: Date) {
    let id = undefined;
    this.store.dispatch(new AddPractise({ description, date, id }));
  }
  
  ngOnInit() {
  }

}

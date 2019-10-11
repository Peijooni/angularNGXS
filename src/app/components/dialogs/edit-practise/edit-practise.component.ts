import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-practise',
  templateUrl: './edit-practise.component.html',
  styleUrls: ['./edit-practise.component.css']
})
export class EditPractiseComponent implements OnInit {
  angForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditPractiseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
    ) {
      console.log("Tämä",this.data);
      this.createForm();
    }

  createForm() {
    this.angForm = this.fb.group({
      title: [this.data.title, Validators.required ],
      description: [this.data.description, Validators.required ],
      date: [this.data.date, Validators.required ]
    });
  }

  savePractise() {
    this.data.title = this.angForm.value.title;
    this.data.description = this.angForm.value.description;
    this.data.date = this.angForm.value.date;
    this.dialogRef.close(this.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

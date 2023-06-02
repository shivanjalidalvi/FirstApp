import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-edit-add',
  templateUrl: './emp-edit-add.component.html',
  styleUrls: ['./emp-edit-add.component.css'],
})
export class EmpEditAddComponent implements OnInit {
  empform: FormGroup;
  education: string[] = ['SSC', 'HSC', 'Diploma', 'Graduate', 'Post Graduate'];

  constructor(
    private _fb: FormBuilder,
    private _empservice: EmployeeService,
    private _dialogRef: MatDialogRef<EmpEditAddComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public empData: any
  ) {
    this.empform = this._fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      educations: '',
      company: '',
      experience: '',
      package: '',
    });
  }
  ngOnInit(): void {
    this.empform.patchValue(this.empData);
  }
  onFormSubmit() {
    if (this.empform.valid) {
      if (this.empData) {
        this._empservice
          .updateEmployee(this.empData.id, this.empform.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'employee updated Successfully',
                'ok'
              );

              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        this._empservice.addEmployee(this.empform.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('employee added ', 'ok');

            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}

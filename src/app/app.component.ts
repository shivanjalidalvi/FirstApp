import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpEditAddComponent } from './emp-edit-add/emp-edit-add.component';
import { EmployeeService } from './services/employee.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { CoreService } from './core/core.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FirstApp';

  
    displayedColumns: string[] = ['id',
     'firstname', 
     'lastname',
      'email',
      'dob',
      'gender',
      'educations',
      'company',
      'experience',
      'package',
      'action']; 
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!:MatPaginator;
    @ViewChild(MatSort) sort!:MatSort;
  constructor(private _dailog: MatDialog,
    private _empService: EmployeeService,
    private _coreService:CoreService
    )
  {
  }

  ngOnInit():void{
       this.getEmployeeList();
  }
    openAddEditForm() 
    {
      const _dailogRef = this._dailog.open(EmpEditAddComponent);
      _dailogRef.afterClosed().subscribe({
        next:(val)=>{
          if(val){
            this.getEmployeeList();
          }
        }
      })
    }
  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next:(res)=>{
           this.dataSource=new MatTableDataSource(res) ;
           this.dataSource.sort=this.sort;
           this.dataSource.paginator=this.paginator;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
      
        this._coreService.openSnackBar('employee deleted','ok')
        this.getEmployeeList();
      },error:(err)=>{
console.log(err)
      }
    })
  }

  openEditForm(data:any) 
    {
     const _dailogRef= this._dailog.open(EmpEditAddComponent,{
        data:data
      });
      _dailogRef.afterClosed().subscribe({
        next:(val)=>{
          if(val){
            this.getEmployeeList();
          }
        }
      })
    }
}

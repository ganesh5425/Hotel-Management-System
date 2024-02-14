import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from '../../../service/room.service';
import { UsersModel } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  roomSrv = inject(RoomService);

  constructor(private formbuilder: FormBuilder) { }
  userList: any;
  formValue !: FormGroup;
  id: string = "";
  showAdd: boolean = true;
  showUpdate: boolean = false;
  usersModelObj: UsersModel = new UsersModel();

  role: string[] = ['General Staff', 'Kitchen Staff', 'Management Staff']
  roleSelect: string = "";

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({

      userName: [''],
      password: [''],
      role: [''],
    })
    this.getUsers();
  }

  resetUserEntry() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.roleSelect = "";
  }

  getUsers() {
    this.formValue.reset();
    this.roomSrv.getAllUsers().subscribe((res: any) => {
      // debugger;
      this.userList = res;
    })
  }

  onSaveUser() {
    this.usersModelObj.userName = this.formValue.value.userName;
    this.usersModelObj.password = this.formValue.value.password;
    this.usersModelObj.role = this.formValue.value.role;

    this.roomSrv.addUser(this.usersModelObj).subscribe({
      next: (res: any) => {
        console.log(res);
        alert("User added successfully");
        this.formValue.reset();
        this.getUsers();
      },
      error: err => {
        console.log(err);
      }
    })

  }
  // for edit user
  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.id = data.id;
    this.formValue.controls['userName'].setValue(data.userName);
    this.formValue.controls['password'].setValue(data.password);
    this.formValue.controls['role'].setValue(data.role);

  }
  updateUser() {

    this.usersModelObj.userName = this.formValue.value.userName;
    this.usersModelObj.password = this.formValue.value.password;
    this.usersModelObj.role = this.formValue.value.role;

    this.roomSrv.addUpdateUser(this.usersModelObj, this.id).subscribe({
      next: (res: any) => {
        alert("Updated Successfully");
        this.formValue.reset();
        this.getUsers();
      },
      error: err => {
        console.log(err);
      }
    })

    this.showAdd = true;
    this.showUpdate = false;
  }

  resetForm() {
    this.showAdd = true;
    this.showUpdate = false;
    this.formValue.reset();
  }
  onDelete(data: any) {
    const isDelete = confirm('Are you sure Want to Delete');
    if (isDelete) {
      this.roomSrv.deleteUser(data.id).subscribe({
        next: (res: any) => {
          alert('Room Deleted Success');
          this.getUsers();
        },
        error: err => {
          console.log(err);
        }
      })

    }
  }
}

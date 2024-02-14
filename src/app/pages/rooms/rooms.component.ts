import { Component, OnInit, inject } from '@angular/core';
import { RoomService } from '../../../service/room.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { RoomsModel } from './rooms.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {
  roomSrv = inject(RoomService);
  constructor(private formbuilder: FormBuilder) { }
  roomList: any;
  showAdd !: boolean;
  showUpdate!: boolean;
  formValue !: FormGroup;
  id: string = "";
  roomsModelObj: RoomsModel = new RoomsModel();

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({

      roomName: [''],
      isAcAvailable: [''],
      roomCapacity: [''],
      isActive: [''],
      roomTariff: [''],
      extensionNo: ['']
    })
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomSrv.getAllRooms().subscribe({
      next: (res: any) => {
        // debugger;
        this.roomList = res;
      }
    })
  }

  addRoomDetails() {

    this.roomsModelObj.roomName = this.formValue.value.roomName;
    this.roomsModelObj.isAcAvailable = this.formValue.value.isAcAvailable;
    this.roomsModelObj.roomCapacity = this.formValue.value.roomCapacity;
    this.roomsModelObj.isActive = this.formValue.value.isActive;
    this.roomsModelObj.roomTariff = this.formValue.value.roomTariff;
    this.roomsModelObj.extensionNo = this.formValue.value.extensionNo;

    this.roomSrv.addRoom(this.roomsModelObj).subscribe({
      next: (res: any) => {
        console.log(res);
        alert("Room added successfully");
        let ref = document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getAllRooms();
      },
      error: err => {
        alert("Something went wrong");
      }
    })
  }

  clickAddRoom() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  saveRooms(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.id = row.id;
    this.formValue.controls['roomName'].setValue(row.roomName);
    this.formValue.controls['isAcAvailable'].setValue(row.isAcAvailable);
    this.formValue.controls['roomCapacity'].setValue(row.roomCapacity);
    this.formValue.controls['isActive'].setValue(row.isActive);
    this.formValue.controls['roomTariff'].setValue(row.roomTariff);
    this.formValue.controls['extensionNo'].setValue(row.extensionNo);

  }
  updateRoomDetails() {
    this.roomsModelObj.roomName = this.formValue.value.roomName;
    this.roomsModelObj.isAcAvailable = this.formValue.value.isAcAvailable;
    this.roomsModelObj.roomCapacity = this.formValue.value.roomCapacity;
    this.roomsModelObj.isActive = this.formValue.value.isActive;
    this.roomsModelObj.roomTariff = this.formValue.value.roomTariff;
    this.roomsModelObj.extensionNo = this.formValue.value.extensionNo;

    this.roomSrv.saveUpdateRoom(this.roomsModelObj, this.id)
      .subscribe({
        next: (res: any) => {
          alert("Updated Successfully");
          let ref = document.getElementById('close')
          ref?.click();
          this.formValue.reset();
          this.getAllRooms();
        },
        error: (err: any) => {
          console.log(err)
        }
      })
  }

  onDelete(row: any) {
    console.log(row.id);
    const isDelete = confirm('Are you sure Wamt to Delete');
    if (isDelete) {
      this.roomSrv.deleteRoom(row.id).subscribe({
        next: (res: any) => {

          alert('Room Deleted Success');
          this.getAllRooms();
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
}



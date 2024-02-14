import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../service/room.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrl: './new-booking.component.css'
})
export class NewBookingComponent implements OnInit {

  
  bookingObj: any  = {
    "name": "",
    "mobileNo": "",
    "email": "",
    "aadharNo": "",
    "city": "",
    "district": "",
    "state": "",
    "country": "",
    "pin": "",
    "roomId": 0,
    "customerId": 0,
    "bookingFromDate": "",
    "bookingToDate": "",
    "createdDate": new Date(),
    "bookingRate": 0,
    "createdBy": 0,
    "hotelBookingDetails": [
      
    ]
  };

  guestObj: any = {
    "bookingDetailId": 0,
    "bookingId": 0,
    "customerName": "",
    "aadharCardNo": ""
  }
  roomList:any;
  formValue !:FormGroup;
  
  constructor(private roomSrv: RoomService,private route:Router,private formbuilder:FormBuilder) {}
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
    "name": ['',Validators.required],
    "mobileNo": ['',[Validators.required,Validators.maxLength(10)]],
    "email": ['',[Validators.required]],
    "aadharNo": ['',Validators.required],
    "city": [''],
    "district": [''],
    "state": [''],
    "country": [''],
    "pin": [''],
    "roomId":  ['',Validators.required],
    "customerId": [''],
    "bookingFromDate":  ['',Validators.required],
    "bookingToDate": ['',Validators.required],
    "createdBy":  [''],
    "hotelBookingDetails":this.formbuilder.array([]),

    "bookingDetailId": [''],
    "customerName":[''],
    "aadharCardNo":[''],
    "bookingId":[''],

    });
      this.loadRooms();
  }

  loadRooms() {
    this.roomSrv.getAllRooms().subscribe({
      next:(res:any)=>{
        this.roomList = res;
      },
      error:err=>{
        console.log(err);
      }
      
    });
  }

  addGuest() {
    const obj = JSON.stringify(this.guestObj);
    const parserobj = JSON.parse(obj);
    this.bookingObj.hotelBookingDetails.unshift(parserobj);
  }

  removeGuest(index:number) {
    this.formValue.get('customerName')?.patchValue(null);
    this.formValue.get('aadharCardNo')?.patchValue(null);
    this.bookingObj.hotelBookingDetails.splice(index,1);
  }

  onSaveBooking() {
    this.bookingObj.name = this.formValue.value.name;
    this.bookingObj.mobileNo = this.formValue.value.mobileNo;
    this.bookingObj.email = this.formValue.value.email;
    this.bookingObj.aadharNo = this.formValue.value.aadharNo;
    this.bookingObj.city = this.formValue.value.city;
    this.bookingObj.district = this.formValue.value.district;
    this.bookingObj.state = this.formValue.value.state;
    this.bookingObj.country = this.formValue.value.country;
    this.bookingObj.pin = this.formValue.value.pin;
    this.bookingObj.roomId = this.formValue.value.roomId;
    this.bookingObj.customerId = this.formValue.value.customerId;
    this.bookingObj.bookingFromDate = this.formValue.value.bookingFromDate;
    this.bookingObj.bookingToDate = this.formValue.value.bookingToDate;
    this.bookingObj.bookingRate = this.formValue.value.bookingRate;
    this.bookingObj.createdDate = this.formValue.value.createdDate;
    this.bookingObj.createdBy = this.formValue.value.createdBy;
    this.guestObj.customerName = this.formValue.value.customerName;
    this.guestObj.aadharCardNo = this.formValue.value.aadharCardNo;

    this.bookingObj.hotelBookingDetails= this.guestObj
    console.log(this.bookingObj.hotelBookingDetails);

    this.roomSrv.createBooking(this.bookingObj).subscribe({
      next:(res: any) => {
        alert('Booking Created')
        this.formValue.reset();
        this.route.navigate(['/bookings'])
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

}

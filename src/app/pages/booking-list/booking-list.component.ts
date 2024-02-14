import { Component, OnInit, inject } from '@angular/core';
import { RoomService } from '../../../service/room.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit {

  bookingList: any;

  roomSrv = inject(RoomService);

  ngOnInit(): void {
    this.getBookings();
  }
  getBookings() {
    this.roomSrv.getAllBooking().subscribe({
      next: (res) => {
        this.bookingList = res;
        console.log(res.hotelBookingDetails)
      },
      error: (err) => {
        alert("Something Went Wrong");
      }
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  apiEndPoint: string = "http://localhost:3000/";

  // for Room section
  getAllRooms() {
    return this.http.get<any>(this.apiEndPoint + "GetAllRooms").pipe(map((res:any)=>{
      return res;
    }))
  }

  addRoom(data:any){
    return this.http.post<any>(this.apiEndPoint + 'GetAllRooms',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  saveUpdateRoom(obj: any,id:any) {
    return this.http.put<any>(this.apiEndPoint + 'GetAllRooms/'+id, obj).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteRoom(id: number) {
    return this.http.delete(this.apiEndPoint + 'GetAllRooms/' + id).pipe(map((res:any)=>{
      return res;
    }));
  }

  // for user section
  getAllUsers() {
    return this.http.get<any>(this.apiEndPoint + 'GetAllUsers').pipe(map((res:any)=>{
      return res;
    }))
  } 

  addUser(data:any){
    return this.http.post<any>(this.apiEndPoint + 'GetAllUsers',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addUpdateUser(obj: any,id:any) {
    return this.http.put<any>(this.apiEndPoint + 'GetAllUsers/'+id, obj).pipe(map((res:any)=>{
      return res;
    }));
  }
  deleteUser(id: any) {
    return this.http.delete(this.apiEndPoint + 'GetAllUsers/' + id).pipe(map((res:any)=>{
      return res;
    }));
  }

// for booking section
  createBooking(obj: any) {
    return this.http.post(this.apiEndPoint + 'AllBooking', obj).pipe(map((res:any)=>{
      return res;
    }));
  }
  extraCust(obj: any) {
    return this.http.post(this.apiEndPoint + 'AllBooking/', obj).pipe(map((res:any)=>{
      return res;
    }));
  }
  
  getAllBooking() {
    return this.http.get(this.apiEndPoint + 'AllBooking').pipe(map((res:any)=>{
      return res;
    }))
  } 
}

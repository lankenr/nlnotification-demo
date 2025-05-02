import { Component } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Geolocation } from '@capacitor/geolocation'; 
declare var BTPrinter:any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
myToken="";
myList:any=[];
lat:any;
long:any;

constructor() {}
async getLocation(){
  Geolocation.requestPermissions();
  var data=await Geolocation.getCurrentPosition();
  this.lat=data.coords.latitude;
  this.long=data.coords.longitude;

}
printList(){
  console.log("printList open");
  BTPrinter.list((data:any)=>
    {
    console.log("success!");
    console.log(JSON.stringify(data));
    this.myList=data;
    this.myList=data;
},
function(err:any){
console.log("error");
console.log(JSON.stringify(err));
});
}

async testNotification(){
  await PushNotifications.addListener('registration', token => {
    console.info('Registration token: ', token.value);
    this.myToken=token.value;

  });

  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
}
}

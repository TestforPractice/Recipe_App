import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
// @Output() options=new EventEmitter();
// reciepes(data){
//     this.options.emit(data);
// }
// shopping(data){
//     this.options.emit(data);
// }

private usersub:Subscription;
isAuthenticated=false;

constructor(private datastorage:DataStorageService, private authService:AuthService){}
ngOnInit(): void {
    this.usersub=this.authService.user.subscribe(user=>{
           this.isAuthenticated=!user? false :true;//or we can write as !!user
    });
}

ngOnDestroy(): void {
    this.usersub.unsubscribe();
}

onSaveData(){
 this.datastorage.storeRecipes();

}

onFetchData(){
    this.datastorage.fetchRecipes().subscribe();
}
onLogout(){
    this.authService.logout()
}
}
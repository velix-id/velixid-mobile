import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { SecureStorage } from "nativescript-secure-storage";
import { RouterExtensions } from "nativescript-angular/router";

// instantiate the plugin

@Component({
    selector: "Password",
    moduleId: module.id,
    templateUrl: "./password.component.html",
    styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
    secureStorage = new SecureStorage();
    pin:String="";
    heading:String="Enter PIN";
    hint:String="Enter 4-digit PIN";
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;
    constructor(private router:RouterExtensions){}
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.secureStorage.get({
            key: "pin"
          }).then(value => {
              if(!value){
                this.heading="Create PIN";
                this.pin="";
                this.hint="Create 4-digit PIN";
              }
          });
    }
    setPin(){
        if(this.pin.length==4){
            this.secureStorage.set({
                key: "pin",
                value: String(this.pin)
            }).then(success => {
                console.log("Successfully set a value? " + success);
                if(success){
                    this.router.navigate(["/home"],{clearHistory: true});
                }
            });
        }
    }
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
    updatePIN(val){
        if(val=="DEL"){
            if(this.pin.length>0){
                this.pin=this.pin.slice(0,this.pin.length-1);
            }
        }
        else
        if(val=="X"){
            //navigate to home or exit
        }
        else{
            if(this.pin.length<4)
                this.pin=this.pin+val;
        }
    }
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}

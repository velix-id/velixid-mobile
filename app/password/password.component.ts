import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
// import { SecureStorage } from "nativescript-secure-storage";
import * as applicationSettings from "application-settings";
// instantiate the plugin
@Component({
    selector: "Password",
    moduleId: module.id,
    templateUrl: "./password.component.html",
    styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
    // secureStorage = new SecureStorage();
    screenCode:Number=1; //0->Create PIN, 1->Enter PIN for login
    pin:String="";
    heading:String="Enter PIN";
    hint:String="Enter 4-digit PIN";
    pass:String="Login";
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
        /* this.applicationSettings.get({
            key: "pin"
          }).then(value => {
              if(!value){
                this.heading="Create PIN";
                this.pin="";
                this.hint="Create 4-digit PIN";
              }
          }); */
          /* let pin:String=applicationSettings.getString("pin");
          if(!pin){
            this.heading="Create PIN";
            this.pin="";
            this.hint="Create 4-digit PIN";
            this.screenCode=0;
          } */
          if(applicationSettings.getString("pin").length==4){
              this.screenCode=0;
          }
    }
    login(){
        let pass=applicationSettings.getString("pin");
        // this.pass=String(pass);
        if(this.pin==pass){
            this.router.navigate(["/home"],{clearHistory: true});
        }
        else{
            this.pin="";
        }
    }
    setPin(){
        if(this.pin.length==4){
            /* this.applicationSettings.set({
                key: "pin",
                value: String(this.pin)
            }).then(success => {
                console.log("Successfully set a value? " + success);
                if(success){
                    this.router.navigate(["/home"],{clearHistory: true});
                }
            }); */
            applicationSettings.setString("pin",String(this.pin));
            this.router.navigate(["/home"],{clearHistory: true});
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

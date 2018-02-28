import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RadListView, ListViewLinearLayout } from "nativescript-pro-ui/listview";
import { DatabaseService } from "../shared/services/database.service";
import { RouterExtensions } from "nativescript-angular/router";
import * as applicationSettings from "application-settings";
import * as dialogs from "ui/dialogs";

@Component({
    selector: "Register",
    moduleId: module.id,
    providers: [DatabaseService],
    templateUrl: "./register.component.html",
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    isLoading:Boolean=true;
    id:number; // for login
    toHide:Boolean=true;
    name:String="";
    email:String="";
    password:String="";
    password2:String="";
    referral:String="";
    entryCode:Number=0; //0->Register 1->Login

    constructor(
        private databaseService: DatabaseService,
        private router:RouterExtensions
    ) {}
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        console.log(this.toHide);
        /* actionDialog({
            message: "Choose Designation",
            cancelButtonText: "Cancel",
            actions: ["QWE","QWEQWE","RTY","RTYRTY"]
        }).then((result) => {
            if(result!="Cancel")
                console.log(result);
        }); */
        this.databaseService.getUserData().then((user)=>{
            if(user["userID"]){
                this.router.navigate(["/home"],{clearHistory: true});
            }
            else{
                this.toHide=false;
                this.isLoading=false;
            }
        });
        /* if(applicationSettings.getString("user",null)){
            // this.changeToLogin();
        }
        else{
        } */
    }
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    changeToLogin(){
        console.log("changed form");
        this.entryCode=(this.entryCode==1)?0:1;
    }
    validateEmail(){
        if(this.email){
            if(!(this.email.indexOf("@")<this.email.length&&this.email.indexOf("@")>0&&this.email.indexOf(".")>this.email.indexOf("@")&&this.email.indexOf(".")<this.email.length)){
                dialogs.action("ERROR","Ok",["Check your email!"]);
                return false;
            }
        }
        return true;
    }
    validatePassword(){
        console.log("HERE");
        if(this.password&&this.password2){
            if(this.password.length<5){
                dialogs.action("ERROR","Ok",["Password must be atleast 5 characters long!"]);
                this.password="";
                this.password2="";
                return false;
            }
            if(this.password2!=this.password){
                dialogs.action("ERROR","Ok",["Passwords don't match!"]);
                this.password="";
                this.password2="";
                return false;
            }
            else{
                return true;
            }
        }
        dialogs.action("ERROR","Ok",["Password must be atleast 5 characters long!"]);
        return false;
    }
    
    signUp(){
        if(!(this.validateEmail()&&this.validatePassword()&&this.name)){
            return;
        }
        this.isLoading=true;
        const userData={
            name: this.name,
            email: this.email,
            pass: this.password,
        };
        // console.dir(userData);
        this.databaseService.submitToFirebase(userData).then((success) => {
            this.isLoading=false;
            if(success){
                dialogs.action("SUCCESS","Ok",["Account created successfully"]);
                this.changeToLogin();
                // this.router.navigate(["/home"],{clearHistory: true});                
            }
            else{
                this.email="";
                this.password="";
                this.password2="";
            }
        });
        /* if(result){
            this.router.navigate(["/home"],{clearHistory: true});
        }
        else{
            console.log("Failed");
        } */
    }
    login(){
        this.email="";
        this.name="";
        this.password2="";
        if(!this.password){
            dialogs.action("ERROR","Ok",["Password canot be empty!"]);
            return;
        }
        if(this.password.length<5){
            dialogs.action("ERROR","Ok",["Password must be atleast 5 characters long!"]);
            return;
        }
        if(!this.id){
            // dialogs.action("ERROR","Ok",["!"]);
            return;
        }
        this.isLoading=true;
        console.log("LOGIN");
        const userData={
            id: this.id,
            pass: this.password,
        };
        this.databaseService.validateFromFirebase(userData).then((success) => {
            if(success){
                this.router.navigate(["/home"],{clearHistory: true});
            }
            else{
                this.isLoading=false;
            }
        });
    }
}

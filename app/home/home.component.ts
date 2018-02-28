import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { DatabaseService } from "../shared/services/database.service";
import * as applicationSettings from "application-settings";

@Component({
    selector: "Home",
    moduleId: module.id,
    providers: [DatabaseService],
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    /* firebase=Firebase.createNew({
        url: "https://velix-mobile.firebaseio.com"
    }); */
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/

    isLoading:Boolean=true;
    requestAuthID:Number=500002;
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    user:any={
        name:"",
        email:"",
        userID:""
    };
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private databaseService: DatabaseService,
    ) {}

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.databaseService.getUserData().then((user)=>{
            if(user["userID"]){
                this.user.name=user["name"];
                this.user.email=user["email"];
                this.user.userID=user["userID"];
                this.databaseService.instantiateListeners(this.user);
                this.isLoading=false;
            }
        });
        /* this.user=JSON.parse(applicationSettings.getString("user"));
        if(this.user.userID){
            // console.log("YEAH, HE'S THERE!");
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
    logUserData(){
        console.dir(this.user);
    }
    requestAuth(){
        // console.log("REQUESTED!");
        this.databaseService.requestAuthInitial(this.user.userID,this.requestAuthID);
    }
    getLogs(){
        // console.log("LOGS");
        console.dir(this.databaseService.getLogs());
    }
}

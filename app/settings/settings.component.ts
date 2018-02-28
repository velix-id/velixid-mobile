import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import * as applicationSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { DatabaseService } from "../shared/services/database.service";

@Component({
    selector: "Settings",
    moduleId: module.id,
    providers: [DatabaseService],
    templateUrl: "./settings.component.html",
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private router: RouterExtensions,
        private databaseService: DatabaseService,
    ) {}

    showMessage:Boolean=false;
    isLoading:Boolean=false;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
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
    backupProfile(){
        console.log("backup profile");
    }
    restoreProfile(){
        console.log("restore profile");
    }
    logout(){
        this.isLoading=true;
        this.databaseService.logout().then((showMessage)=>{
            if(showMessage){
                this.showMessage=true;
                // this.isLoading=false;
                /* setTimeout(()=>{
                    this.router.navigateByUrl("register",{clearHistory:true});
                },3000); */
            }
        });
        // console.log("LOGOUT");
        // applicationSettings.remove("user");
        // this.router.navigate(["/register"],{clearHistory: true});
    }
}
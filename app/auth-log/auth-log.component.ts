import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import * as listViewModule from "tns-core-modules/ui/list-view";
import { RadListView, ListViewLinearLayout } from "nativescript-pro-ui/listview";
import { DatabaseService } from "../shared/services/database.service";

@Component({
    selector: "AuthLog",
    moduleId: module.id,
    providers: [DatabaseService],
    templateUrl: "./auth-log.component.html",
    styleUrls: ['./auth-log.component.css']
})
export class AuthLogComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    
    
    logs=[];

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private databaseService: DatabaseService,
    ) {}

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.getLogs();
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
    getLogs(){
        // console.log("LOGS");
        this.databaseService.getLogs().then((data)=>{
            this.logs=data["logs"];
        });
        // console.dir(this.logs);
    }
}

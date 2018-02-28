import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RadListView, ListViewLinearLayout } from "nativescript-pro-ui/listview";
import { DatabaseService } from "../shared/services/database.service";
import * as applicationSettings from "application-settings";
import * as dialogs from "ui/dialogs";

@Component({
    selector: "Authorize",
    moduleId: module.id,
    providers: [DatabaseService],
    templateUrl: "./authorize.component.html",
    styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    isLoading:boolean=true;
    requestAuthID:String="";
    user:any={
        name:"",
        email:"",
        userID:""
    };
    requests=[];

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
                this.isLoading=false;
                this.getRequests();
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
    requestAuth(){
        this.isLoading=true;
        // console.log("REQUESTED!");
        // console.log(this.requestAuthID);
        this.databaseService.requestAuthInitial(this.user.userID,Number(this.requestAuthID)).then((result)=>{
            let data:any=result;
            if(data.success){
                dialogs.action("SUCCESS","Ok",[data.message]);
            }
            else{
                dialogs.action("ERROR","Ok",[data.message]);
            }
            this.isLoading=false;
        });
    }
    getRequests(){
        this.isLoading=true;
        // console.log("REQUESTS");
        this.databaseService.getRequests().then((data)=>{
            this.requests=data["requests"];
            this.isLoading=false;
        });
        // console.dir(this.requests);
    }
    approveRequest(index,currentUser,targetUser){
        this.isLoading=true;
        dialogs.confirm("Are you sure? (This cannot be undone!)").then((result) => {
            if(result){
                // console.log(currentUser,targetUser);
                this.databaseService.approveRequest(currentUser,targetUser).then((success)=>{
                    if(success){
                        // this.getRequests();
                        // console.log("SUCCESS");
                        dialogs.action("SUCCESS","Ok",["Request Approved"]).then(()=>{
                            this.requests[index].status=1;
                            this.isLoading=false;
                        });
                    }
                });
            }
            else{
                this.isLoading=false;
            }
        });
    }
    declineRequest(index,currentUser,targetUser){
        this.isLoading=true;
        dialogs.confirm("Are you sure? (This cannot be undone!)").then((result) => {
            if(result){
                // console.log(currentUser,targetUser);
                this.databaseService.declineRequest(currentUser,targetUser).then((success)=>{
                    if(success){
                        // this.getRequests();
                        // console.log("SUCCESS");
                        dialogs.action("SUCCESS","Ok",["Request Declined"]).then(()=>{
                            this.requests[index].status=0;
                            this.isLoading=false;
                        });
                    }
                });
            }
            else{
                this.isLoading=false;
            }
        });
    }
}


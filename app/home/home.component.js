"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var database_service_1 = require("../shared/services/database.service");
var HomeComponent = (function () {
    function HomeComponent(databaseService) {
        this.databaseService = databaseService;
        /* firebase=Firebase.createNew({
            url: "https://velix-mobile.firebaseio.com"
        }); */
        /* ***********************************************************
        * Use the @ViewChild decorator to get a reference to the drawer component.
        * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
        *************************************************************/
        this.isLoading = true;
        this.requestAuthID = 500002;
        this.user = {
            name: "",
            email: "",
            userID: ""
        };
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.databaseService.getUserData().then(function (user) {
            if (user["userID"]) {
                _this.user.name = user["name"];
                _this.user.email = user["email"];
                _this.user.userID = user["userID"];
                _this.databaseService.instantiateListeners(_this.user);
                _this.isLoading = false;
            }
        });
        /* this.user=JSON.parse(applicationSettings.getString("user"));
        if(this.user.userID){
            // console.log("YEAH, HE'S THERE!");
        } */
    };
    Object.defineProperty(HomeComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    HomeComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    HomeComponent.prototype.logUserData = function () {
        console.dir(this.user);
    };
    HomeComponent.prototype.requestAuth = function () {
        // console.log("REQUESTED!");
        this.databaseService.requestAuthInitial(this.user.userID, this.requestAuthID);
    };
    HomeComponent.prototype.getLogs = function () {
        // console.log("LOGS");
        console.dir(this.databaseService.getLogs());
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], HomeComponent.prototype, "drawerComponent", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            providers: [database_service_1.DatabaseService],
            templateUrl: "./home.component.html",
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [database_service_1.DatabaseService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

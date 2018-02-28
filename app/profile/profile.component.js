"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var database_service_1 = require("../shared/services/database.service");
var ProfileComponent = (function () {
    function ProfileComponent(databaseService) {
        this.databaseService = databaseService;
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.databaseService.getUserData().then(function (user) {
            if (user["userID"]) {
                _this.user.name = user["name"];
                _this.user.email = user["email"];
                _this.user.userID = user["userID"];
            }
        });
        // this.user=JSON.parse(applicationSettings.getString("user"));
    };
    Object.defineProperty(ProfileComponent.prototype, "sideDrawerTransition", {
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
    ProfileComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], ProfileComponent.prototype, "drawerComponent", void 0);
    ProfileComponent = __decorate([
        core_1.Component({
            selector: "Profile",
            moduleId: module.id,
            templateUrl: "./profile.component.html",
            styleUrls: ['./profile.component.css']
        }),
        __metadata("design:paramtypes", [database_service_1.DatabaseService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;

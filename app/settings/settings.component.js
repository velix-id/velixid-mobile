"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var router_1 = require("nativescript-angular/router");
var database_service_1 = require("../shared/services/database.service");
var SettingsComponent = (function () {
    function SettingsComponent(router, databaseService) {
        this.router = router;
        this.databaseService = databaseService;
        this.showMessage = false;
        this.isLoading = false;
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    SettingsComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    };
    Object.defineProperty(SettingsComponent.prototype, "sideDrawerTransition", {
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
    SettingsComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    SettingsComponent.prototype.backupProfile = function () {
        console.log("backup profile");
    };
    SettingsComponent.prototype.restoreProfile = function () {
        console.log("restore profile");
    };
    SettingsComponent.prototype.logout = function () {
        var _this = this;
        this.isLoading = true;
        this.databaseService.logout().then(function (showMessage) {
            if (showMessage) {
                _this.showMessage = true;
                // this.isLoading=false;
                /* setTimeout(()=>{
                    this.router.navigateByUrl("register",{clearHistory:true});
                },3000); */
            }
        });
        // console.log("LOGOUT");
        // applicationSettings.remove("user");
        // this.router.navigate(["/register"],{clearHistory: true});
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], SettingsComponent.prototype, "drawerComponent", void 0);
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "Settings",
            moduleId: module.id,
            providers: [database_service_1.DatabaseService],
            templateUrl: "./settings.component.html",
            styleUrls: ['./settings.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            database_service_1.DatabaseService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var router_1 = require("nativescript-angular/router");
// import { SecureStorage } from "nativescript-secure-storage";
var applicationSettings = require("application-settings");
// instantiate the plugin
var PasswordComponent = (function () {
    function PasswordComponent(router) {
        this.router = router;
        // secureStorage = new SecureStorage();
        this.screenCode = 1; //0->Create PIN, 1->Enter PIN for login
        this.pin = "";
        this.heading = "Enter PIN";
        this.hint = "Enter 4-digit PIN";
        this.pass = "Login";
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    PasswordComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
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
        if (applicationSettings.getString("pin").length == 4) {
            this.screenCode = 0;
        }
    };
    PasswordComponent.prototype.login = function () {
        var pass = applicationSettings.getString("pin");
        // this.pass=String(pass);
        if (this.pin == pass) {
            this.router.navigate(["/home"], { clearHistory: true });
        }
        else {
            this.pin = "";
        }
    };
    PasswordComponent.prototype.setPin = function () {
        if (this.pin.length == 4) {
            /* this.applicationSettings.set({
                key: "pin",
                value: String(this.pin)
            }).then(success => {
                console.log("Successfully set a value? " + success);
                if(success){
                    this.router.navigate(["/home"],{clearHistory: true});
                }
            }); */
            applicationSettings.setString("pin", String(this.pin));
            this.router.navigate(["/home"], { clearHistory: true });
        }
    };
    Object.defineProperty(PasswordComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    PasswordComponent.prototype.updatePIN = function (val) {
        if (val == "DEL") {
            if (this.pin.length > 0) {
                this.pin = this.pin.slice(0, this.pin.length - 1);
            }
        }
        else if (val == "X") {
            //navigate to home or exit
        }
        else {
            if (this.pin.length < 4)
                this.pin = this.pin + val;
        }
    };
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    PasswordComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], PasswordComponent.prototype, "drawerComponent", void 0);
    PasswordComponent = __decorate([
        core_1.Component({
            selector: "Password",
            moduleId: module.id,
            templateUrl: "./password.component.html",
            styleUrls: ['./password.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], PasswordComponent);
    return PasswordComponent;
}());
exports.PasswordComponent = PasswordComponent;

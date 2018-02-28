"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var database_service_1 = require("../shared/services/database.service");
var AuthLogComponent = (function () {
    function AuthLogComponent(databaseService) {
        this.databaseService = databaseService;
        this.logs = [];
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    AuthLogComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.getLogs();
    };
    Object.defineProperty(AuthLogComponent.prototype, "sideDrawerTransition", {
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
    AuthLogComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    AuthLogComponent.prototype.getLogs = function () {
        var _this = this;
        // console.log("LOGS");
        this.databaseService.getLogs().then(function (data) {
            _this.logs = data["logs"];
        });
        // console.dir(this.logs);
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], AuthLogComponent.prototype, "drawerComponent", void 0);
    AuthLogComponent = __decorate([
        core_1.Component({
            selector: "AuthLog",
            moduleId: module.id,
            providers: [database_service_1.DatabaseService],
            templateUrl: "./auth-log.component.html",
            styleUrls: ['./auth-log.component.css']
        }),
        __metadata("design:paramtypes", [database_service_1.DatabaseService])
    ], AuthLogComponent);
    return AuthLogComponent;
}());
exports.AuthLogComponent = AuthLogComponent;

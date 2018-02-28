"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var database_service_1 = require("../shared/services/database.service");
var dialogs = require("ui/dialogs");
var AuthorizeComponent = (function () {
    function AuthorizeComponent(databaseService) {
        this.databaseService = databaseService;
        this.isLoading = true;
        this.requestAuthID = "";
        this.user = {
            name: "",
            email: "",
            userID: ""
        };
        this.requests = [];
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    AuthorizeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.databaseService.getUserData().then(function (user) {
            if (user["userID"]) {
                _this.user.name = user["name"];
                _this.user.email = user["email"];
                _this.user.userID = user["userID"];
                _this.isLoading = false;
                _this.getRequests();
            }
        });
        /* this.user=JSON.parse(applicationSettings.getString("user"));
        if(this.user.userID){
            // console.log("YEAH, HE'S THERE!");
        } */
    };
    Object.defineProperty(AuthorizeComponent.prototype, "sideDrawerTransition", {
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
    AuthorizeComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    AuthorizeComponent.prototype.requestAuth = function () {
        var _this = this;
        this.isLoading = true;
        // console.log("REQUESTED!");
        // console.log(this.requestAuthID);
        this.databaseService.requestAuthInitial(this.user.userID, Number(this.requestAuthID)).then(function (result) {
            var data = result;
            if (data.success) {
                dialogs.action("SUCCESS", "Ok", [data.message]);
            }
            else {
                dialogs.action("ERROR", "Ok", [data.message]);
            }
            _this.isLoading = false;
        });
    };
    AuthorizeComponent.prototype.getRequests = function () {
        var _this = this;
        this.isLoading = true;
        // console.log("REQUESTS");
        this.databaseService.getRequests().then(function (data) {
            _this.requests = data["requests"];
            _this.isLoading = false;
        });
        // console.dir(this.requests);
    };
    AuthorizeComponent.prototype.approveRequest = function (index, currentUser, targetUser) {
        var _this = this;
        this.isLoading = true;
        dialogs.confirm("Are you sure? (This cannot be undone!)").then(function (result) {
            if (result) {
                // console.log(currentUser,targetUser);
                _this.databaseService.approveRequest(currentUser, targetUser).then(function (success) {
                    if (success) {
                        // this.getRequests();
                        // console.log("SUCCESS");
                        dialogs.action("SUCCESS", "Ok", ["Request Approved"]).then(function () {
                            _this.requests[index].status = 1;
                            _this.isLoading = false;
                        });
                    }
                });
            }
            else {
                _this.isLoading = false;
            }
        });
    };
    AuthorizeComponent.prototype.declineRequest = function (index, currentUser, targetUser) {
        var _this = this;
        this.isLoading = true;
        dialogs.confirm("Are you sure? (This cannot be undone!)").then(function (result) {
            if (result) {
                // console.log(currentUser,targetUser);
                _this.databaseService.declineRequest(currentUser, targetUser).then(function (success) {
                    if (success) {
                        // this.getRequests();
                        // console.log("SUCCESS");
                        dialogs.action("SUCCESS", "Ok", ["Request Declined"]).then(function () {
                            _this.requests[index].status = 0;
                            _this.isLoading = false;
                        });
                    }
                });
            }
            else {
                _this.isLoading = false;
            }
        });
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], AuthorizeComponent.prototype, "drawerComponent", void 0);
    AuthorizeComponent = __decorate([
        core_1.Component({
            selector: "Authorize",
            moduleId: module.id,
            providers: [database_service_1.DatabaseService],
            templateUrl: "./authorize.component.html",
            styleUrls: ['./authorize.component.css']
        }),
        __metadata("design:paramtypes", [database_service_1.DatabaseService])
    ], AuthorizeComponent);
    return AuthorizeComponent;
}());
exports.AuthorizeComponent = AuthorizeComponent;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var nativescript_secure_storage_1 = require("nativescript-secure-storage");
// instantiate the plugin
var PasswordComponent = (function () {
    function PasswordComponent() {
        this.pin = "";
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    PasswordComponent.prototype.ngOnInit = function () {
        var secureStorage = new nativescript_secure_storage_1.SecureStorage();
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        /* secureStorage.get({
            key: "pin"
          }).then(value => console.log("Got value: " + value)); */
        /* this.secureStorage.set({
            key: "foo",
            value: "I was set at " + new Date()
        }).then(success => console.log("Successfully set a value? " + success));     */
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
        __metadata("design:paramtypes", [])
    ], PasswordComponent);
    return PasswordComponent;
}());
exports.PasswordComponent = PasswordComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELDZEQUE4RjtBQUM5RixrRUFBZ0Y7QUFDaEYsMkVBQTREO0FBRTVELHlCQUF5QjtBQVF6QjtJQVNJO1FBUkEsUUFBRyxHQUFRLEVBQUUsQ0FBQztJQVFBLENBQUM7SUFDZjs7a0VBRThEO0lBQzlELG9DQUFRLEdBQVI7UUFDSSxJQUFJLGFBQWEsR0FBRyxJQUFJLDJDQUFhLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxtQ0FBc0IsRUFBRSxDQUFDO1FBQzFEOztrRUFFMEQ7UUFDMUQ7Ozt1RkFHK0U7SUFDbkYsQ0FBQztJQUVELHNCQUFJLG1EQUFvQjthQUF4QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFDRCxxQ0FBUyxHQUFULFVBQVUsR0FBRztRQUNULEVBQUUsQ0FBQSxDQUFDLEdBQUcsSUFBRSxLQUFLLENBQUMsQ0FBQSxDQUFDO1lBQ1gsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQ0osRUFBRSxDQUFBLENBQUMsR0FBRyxJQUFFLEdBQUcsQ0FBQyxDQUFBLENBQUM7WUFDVCwwQkFBMEI7UUFDOUIsQ0FBQztRQUNELElBQUksQ0FBQSxDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBQ0Q7OztrRUFHOEQ7SUFDOUQsNkNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQTNDb0I7UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7a0NBQWtCLGdDQUFzQjs4REFBQztJQU5wRCxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQzFDLENBQUM7O09BQ1csaUJBQWlCLENBa0Q3QjtJQUFELHdCQUFDO0NBQUEsQUFsREQsSUFrREM7QUFsRFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IFNlY3VyZVN0b3JhZ2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNlY3VyZS1zdG9yYWdlXCI7XG5cbi8vIGluc3RhbnRpYXRlIHRoZSBwbHVnaW5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiUGFzc3dvcmRcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFzc3dvcmQuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9wYXNzd29yZC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHBpbjpTdHJpbmc9XCJcIjtcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBAVmlld0NoaWxkIGRlY29yYXRvciB0byBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIGRyYXdlciBjb21wb25lbnQuXG4gICAgKiBJdCBpcyB1c2VkIGluIHRoZSBcIm9uRHJhd2VyQnV0dG9uVGFwXCIgZnVuY3Rpb24gYmVsb3cgdG8gbWFuaXB1bGF0ZSB0aGUgZHJhd2VyLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG5cbiAgICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XG4gICAgY29uc3RydWN0b3IoKXt9XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgc2lkZURyYXdlclRyYW5zaXRpb24gcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBvcGVuL2Nsb3NlIGFuaW1hdGlvbiBvZiB0aGUgZHJhd2VyLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGxldCBzZWN1cmVTdG9yYWdlID0gbmV3IFNlY3VyZVN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICAvKiBzZWN1cmVTdG9yYWdlLmdldCh7XG4gICAgICAgICAgICBrZXk6IFwicGluXCJcbiAgICAgICAgICB9KS50aGVuKHZhbHVlID0+IGNvbnNvbGUubG9nKFwiR290IHZhbHVlOiBcIiArIHZhbHVlKSk7ICovXG4gICAgICAgIC8qIHRoaXMuc2VjdXJlU3RvcmFnZS5zZXQoe1xuICAgICAgICAgICAga2V5OiBcImZvb1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiSSB3YXMgc2V0IGF0IFwiICsgbmV3IERhdGUoKVxuICAgICAgICB9KS50aGVuKHN1Y2Nlc3MgPT4gY29uc29sZS5sb2coXCJTdWNjZXNzZnVsbHkgc2V0IGEgdmFsdWU/IFwiICsgc3VjY2VzcykpOyAgICAgKi8gICAgICBcbiAgICB9XG5cbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgfVxuICAgIHVwZGF0ZVBJTih2YWwpe1xuICAgICAgICBpZih2YWw9PVwiREVMXCIpe1xuICAgICAgICAgICAgaWYodGhpcy5waW4ubGVuZ3RoPjApe1xuICAgICAgICAgICAgICAgIHRoaXMucGluPXRoaXMucGluLnNsaWNlKDAsdGhpcy5waW4ubGVuZ3RoLTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYodmFsPT1cIlhcIil7XG4gICAgICAgICAgICAvL25hdmlnYXRlIHRvIGhvbWUgb3IgZXhpdFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBpZih0aGlzLnBpbi5sZW5ndGg8NClcbiAgICAgICAgICAgICAgICB0aGlzLnBpbj10aGlzLnBpbit2YWw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXG4gICAgKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIFVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG59XG4iXX0=
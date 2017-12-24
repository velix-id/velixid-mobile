"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var my_drawer_item_component_1 = require("./my-drawer-item/my-drawer-item.component");
var my_drawer_component_1 = require("./my-drawer/my-drawer.component");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                angular_1.NativeScriptUISideDrawerModule
            ],
            declarations: [
                my_drawer_component_1.MyDrawerComponent,
                my_drawer_item_component_1.MyDrawerItemComponent
            ],
            exports: [
                my_drawer_component_1.MyDrawerComponent,
                angular_1.NativeScriptUISideDrawerModule
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGtFQUF3RjtBQUV4RixzRkFBa0Y7QUFDbEYsdUVBQW9FO0FBbUJwRTtJQUFBO0lBQTRCLENBQUM7SUFBaEIsWUFBWTtRQWpCeEIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsd0NBQThCO2FBQ2pDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLHVDQUFpQjtnQkFDakIsZ0RBQXFCO2FBQ3hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVDQUFpQjtnQkFDakIsd0NBQThCO2FBQ2pDO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxZQUFZLENBQUk7SUFBRCxtQkFBQztDQUFBLEFBQTdCLElBQTZCO0FBQWhCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5cbmltcG9ydCB7IE15RHJhd2VySXRlbUNvbXBvbmVudCB9IGZyb20gXCIuL215LWRyYXdlci1pdGVtL215LWRyYXdlci1pdGVtLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTXlEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9teS1kcmF3ZXIvbXktZHJhd2VyLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNeURyYXdlckNvbXBvbmVudCxcbiAgICAgICAgTXlEcmF3ZXJJdGVtQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE15RHJhd2VyQ29tcG9uZW50LFxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGVcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHsgfVxuIl19
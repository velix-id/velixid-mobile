"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var shared_module_1 = require("../shared/shared.module");
var authorize_routing_module_1 = require("./authorize-routing.module");
var authorize_component_1 = require("./authorize.component");
var AuthorizeModule = (function () {
    function AuthorizeModule() {
    }
    AuthorizeModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                authorize_routing_module_1.AuthorizeRoutingModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                authorize_component_1.AuthorizeComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AuthorizeModule);
    return AuthorizeModule;
}());
exports.AuthorizeModule = AuthorizeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXplLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBRXZFLHlEQUF1RDtBQUN2RCx1RUFBb0U7QUFDcEUsNkRBQTJEO0FBZTNEO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixlQUFlO1FBYjNCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLGlEQUFzQjtnQkFDdEIsNEJBQVk7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDVix3Q0FBa0I7YUFDckI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGVBQWUsQ0FBSTtJQUFELHNCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7QUFBbkIsMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuaW1wb3J0IHsgQXV0aG9yaXplUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2F1dGhvcml6ZS1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgQXV0aG9yaXplQ29tcG9uZW50IH0gZnJvbSBcIi4vYXV0aG9yaXplLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgICAgICBBdXRob3JpemVSb3V0aW5nTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBdXRob3JpemVDb21wb25lbnRcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXV0aG9yaXplTW9kdWxlIHsgfVxuIl19
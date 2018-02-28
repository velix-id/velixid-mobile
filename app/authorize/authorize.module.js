"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
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
                shared_module_1.SharedModule,
                forms_1.NativeScriptFormsModule
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

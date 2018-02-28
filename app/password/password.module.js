"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var shared_module_1 = require("../shared/shared.module");
var password_routing_module_1 = require("./password-routing.module");
var password_component_1 = require("./password.component");
var PasswordModule = (function () {
    function PasswordModule() {
    }
    PasswordModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                password_routing_module_1.PasswordRoutingModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                password_component_1.PasswordComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], PasswordModule);
    return PasswordModule;
}());
exports.PasswordModule = PasswordModule;

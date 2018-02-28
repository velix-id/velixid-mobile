"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
var shared_module_1 = require("../shared/shared.module");
var auth_log_routing_module_1 = require("./auth-log-routing.module");
var auth_log_component_1 = require("./auth-log.component");
var AuthLogModule = (function () {
    function AuthLogModule() {
    }
    AuthLogModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                auth_log_routing_module_1.AuthLogRoutingModule,
                shared_module_1.SharedModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                auth_log_component_1.AuthLogComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AuthLogModule);
    return AuthLogModule;
}());
exports.AuthLogModule = AuthLogModule;

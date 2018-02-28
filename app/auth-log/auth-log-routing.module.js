"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var auth_log_component_1 = require("./auth-log.component");
var routes = [
    { path: "", component: auth_log_component_1.AuthLogComponent }
];
var AuthLogRoutingModule = (function () {
    function AuthLogRoutingModule() {
    }
    AuthLogRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AuthLogRoutingModule);
    return AuthLogRoutingModule;
}());
exports.AuthLogRoutingModule = AuthLogRoutingModule;

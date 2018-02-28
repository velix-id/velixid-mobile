"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var password_component_1 = require("./password.component");
var routes = [
    { path: "", component: password_component_1.PasswordComponent }
];
var PasswordRoutingModule = (function () {
    function PasswordRoutingModule() {
    }
    PasswordRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], PasswordRoutingModule);
    return PasswordRoutingModule;
}());
exports.PasswordRoutingModule = PasswordRoutingModule;

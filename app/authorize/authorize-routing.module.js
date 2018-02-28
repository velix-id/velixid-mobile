"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var authorize_component_1 = require("./authorize.component");
var routes = [
    { path: "", component: authorize_component_1.AuthorizeComponent }
];
var AuthorizeRoutingModule = (function () {
    function AuthorizeRoutingModule() {
    }
    AuthorizeRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AuthorizeRoutingModule);
    return AuthorizeRoutingModule;
}());
exports.AuthorizeRoutingModule = AuthorizeRoutingModule;

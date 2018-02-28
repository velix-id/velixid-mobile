"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var routes = [
    { path: "", redirectTo: "/register", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "register", loadChildren: "./register/register.module#RegisterModule" },
    { path: "profile", loadChildren: "./profile/profile.module#ProfileModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
    { path: "authorize", loadChildren: "./authorize/authorize.module#AuthorizeModule" },
    { path: "authLog", loadChildren: "./auth-log/auth-log.module#AuthLogModule" },
    { path: "authenticate", loadChildren: "./password/password.module#PasswordModule" },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;

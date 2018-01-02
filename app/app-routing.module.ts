import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "profile", loadChildren: "./profile/profile.module#ProfileModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
    { path: "authorize", loadChildren: "./authorize/authorize.module#AuthorizeModule" },
    { path: "authLog", loadChildren: "./auth-log/auth-log.module#AuthLogModule" },
    { path: "authenticate", loadChildren: "./password/password.module#PasswordModule" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

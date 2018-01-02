import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { PasswordRoutingModule } from "./password-routing.module";
import { PasswordComponent } from "./password.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PasswordRoutingModule,
        SharedModule
    ],
    declarations: [
        PasswordComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PasswordModule { }

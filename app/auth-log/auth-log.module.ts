import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { AuthLogRoutingModule } from "./auth-log-routing.module";
import { AuthLogComponent } from "./auth-log.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AuthLogRoutingModule,
        SharedModule
    ],
    declarations: [
        AuthLogComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthLogModule { }

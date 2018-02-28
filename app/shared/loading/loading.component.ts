import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "Loader",
    moduleId: module.id,
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.css"]
})
export class LoadingComponent implements OnInit {

    @Input() isLoading: Boolean;
    ngOnInit(): void {
    }
}
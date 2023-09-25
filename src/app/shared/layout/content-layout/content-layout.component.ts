import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NavService } from "../../service/nav.service";
import { trigger, transition, useAnimation } from "@angular/animations";
import { fadeIn } from "ng-animate";

@Component({
  selector: "app-content-layout",
  templateUrl: "./content-layout.component.html",
  styleUrls: ["./content-layout.component.scss"],
  animations: [
    trigger("animateRoute", [
      transition(
        "* => *",
        useAnimation(fadeIn, {
          // Set the duration to 5seconds and delay to 2 seconds
          params: { timing: 3 },
        })
      ),
    ]),
  ],
})
export class ContentLayoutComponent implements OnInit {
  constructor(public navServices: NavService, private cdr: ChangeDetectorRef) {}

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }

  ngOnInit() {
    this.cdr.detectChanges();
  }
}

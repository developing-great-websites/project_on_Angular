import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import {RequestComponent} from "../../components/request/request.component";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: Dialog) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.dialog.open<string>(RequestComponent, { data: 'callMe'});
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private firebase : AngularFireDatabase,
    private popup:Popup
    ) { }
  private data:Observable<any[]>;

  ngOnInit() {
    this.data = this.firebase.list('product').valueChanges();
    this.data.forEach(element => {
      console.log(element)
      
    });
  }

  ClickButton(){
    this.popup.show();
  }
}

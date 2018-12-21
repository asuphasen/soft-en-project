import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private firebase : AngularFireDatabase) { }
  private data:Observable<any[]>;

  ngOnInit() {
    this.data = this.firebase.list('product').valueChanges();
    this.data.forEach(element => {
      console.log(element)
      
    });
  }

}

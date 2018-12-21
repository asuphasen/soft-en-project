import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private firebase : AngularFireDatabase) { }
  private data:Observable<any[]>;

  ngOnInit() {
    this.data = this.firebase.list('/product',ref=>ref.orderByChild('oid').equalTo("0Krx4LnVJ7cYO58jgxpiGLyDuC93")).valueChanges();
    console.log(this.data);
    this.data.forEach(element => {
      console.log(element);
    });
  }
}
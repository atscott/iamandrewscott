import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  cocktails: FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase) { 
    this.cocktails = db.list('beer-cocktails');
  }

  ngOnInit() {
  }

  delete(recipe) {
   this.cocktails.remove(recipe);
  }

  view(recipe) {
    console.log(recipe.$key);
  }

}

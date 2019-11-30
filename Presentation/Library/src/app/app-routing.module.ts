import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthorComponent } from './author/author.component';
import { CategoryComponent } from './category/category.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  { path: 'authors', component: AuthorComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'books', component: BookComponent },
  {path : '', component : AppComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Author } from '../Models/author';
import { AuthorService } from '../Services/author.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  public hiddenAdd: boolean;
  public listAuthors: any;
  public author: Author;
  constructor(private router: Router, private serviceAuthor: AuthorService) {

    serviceAuthor.getAuthors().subscribe(s => {
      this.listAuthors = s;
      console.log(this.listAuthors);
    });

  }

  ngOnInit() {
    this.hiddenAdd = false;
    this.author = new Author();

  }
  deleteAuthor(e: Author): void {
    this.serviceAuthor.deleteAuthors(e.id.toString()).subscribe(s => {
      this.serviceAuthor.getAuthors().subscribe(s => {
        this.listAuthors = s;
        alert("Eliminado");
      });
    });
  };
  editAuthor(e: Author): void {

    this.hiddenAdd = true;
    this.author = e;
    console.log(this.author);

    //localStorage.removeItem("editEmpId");
    //localStorage.setItem("editEmpId", e.id.toString());
    //this.router.navigate(['edit-emp']);
  };
  addAuthor(): void {
    

    if (this.author.id == 0) {
      this.serviceAuthor.saveAuthors(this.author).subscribe(s => {
        this.author = new Author();

        alert("Author Saved!");

        this.hiddenAdd = false;
        this.serviceAuthor.getAuthors().subscribe(s => {
          this.listAuthors = s;
          console.log(this.listAuthors);
        });

      });
    }else{
      this.serviceAuthor.editAuthors(this.author).subscribe(s => {
        this.author = new Author();
        alert("Author Edited!");
        this.hiddenAdd = false;
        this.serviceAuthor.getAuthors().subscribe(s => {
          this.listAuthors = s;
          console.log(this.listAuthors);
        });
      });
    }

  };

  showAddAuthor(): void {
    this.hiddenAdd = true;
  }
  cancelAddAuthor(): void {
    this.hiddenAdd = false;
    this.author = new Author();
  }

}

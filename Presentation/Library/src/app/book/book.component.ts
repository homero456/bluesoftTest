import { Component, OnInit } from '@angular/core';
import { Book } from '../Models/book';
import { Router } from '@angular/router';
import { BookService } from '../Services/book.service';
import { AuthorService } from '../Services/author.service';
import { CategoryService } from '../Services/category.service';
import { Categoria } from '../Models/categoria';
import { Author } from '../Models/author';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public hiddenAdd: boolean;
  public listBooks: any;
  public authors: any;
  public categories: any;
  public book: Book;
  public idAuthor: number;
  public idCategory: number;
  public text: string;
  constructor(private router: Router, private serviceBook: BookService, private serviceAuthor: AuthorService, private serviceCategory: CategoryService) {

    serviceBook.getBook().subscribe(s => {
      this.listBooks = s;
      console.log(this.listBooks);
    });

    serviceAuthor.getAuthors().subscribe(s => {
      this.authors = s;
      console.log(this.authors);
    });


    serviceCategory.getCategory().subscribe(s => {
      this.categories = s;
      console.log(this.categories);
    });

  }

  ngOnInit() {
    this.hiddenAdd = false;
    this.book = new Book();
    this.book.id = 0;
    console.log(this.book);

  }
  deleteBook(e: Book): void {
    this.serviceBook.deleteBook(e.id.toString()).subscribe(s => {
      this.serviceBook.getBook().subscribe(s => {
        this.listBooks = s;
        alert("Eliminado");
      });
    });
  };
  editBook(e: Book): void {

    this.hiddenAdd = true;
    this.book = e;
    console.log(this.book);
    this.idAuthor = this.book.author.id;
    this.idCategory = this.book.category.id;
    //localStorage.removeItem("editEmpId");
    //localStorage.setItem("editEmpId", e.id.toString());
    //this.router.navigate(['edit-emp']);
  };
  addBook(): void {

    console.log(this.book);
    console.log(this.idAuthor);
    console.log(this.idCategory);
    this.book.category = new Categoria();
    this.book.category.id = this.idCategory;
    this.book.author = new Author();
    this.book.author.id = this.idAuthor;
    if (this.book.id !== undefined && this.book.id == 0) {
      this.serviceBook.saveBook(this.book).subscribe(s => {
        this.book = new Book();

        alert("Book Saved!");

        this.hiddenAdd = false;
        this.serviceBook.getBook().subscribe(s => {
          this.listBooks = s;
          console.log(this.listBooks);
        });

      });
    } else {
      this.serviceBook.editBook(this.book).subscribe(s => {
        this.book = new Book();
        alert("Book Edited!");
        this.hiddenAdd = false;
        this.serviceBook.getBook().subscribe(s => {
          this.listBooks = s;
          console.log(this.listBooks);
        });
      });
    }

  };

  showAddBook(): void {
    this.hiddenAdd = true;
    this.book = new Book();
    this.book.id = 0;
    this.idAuthor = 0;
    this.idCategory = 0;
  }
  cancelAddBook(): void {
    this.hiddenAdd = false;
    this.book = new Book();
  }

  searchBook(): void {
    if (this.text != "") {
      this.serviceBook.searchBook(this.text).subscribe(s => {
        this.listBooks = s;
        console.log(this.listBooks);

      });
    } else {
      this.serviceBook.getBook().subscribe(s => {
        this.listBooks = s;
        console.log(this.listBooks);
      });
    }
  }
}

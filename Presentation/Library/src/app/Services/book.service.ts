import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../Models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public result: any;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:5000/api/Library';
   }
  public url : string;

  getBook(): Observable<any> {

    return this.http.get(this.url+'/listBooks');
  }


  saveBook(book: Book) {
  
    return this.http.post<any>(this.url+'/saveBooks', book);
  }

  editBook(book: Book) {
  
    return this.http.put<any>(this.url+'/updateBooks/'+book.id, book);
  }

  deleteBook(id: string) {
    
    return this.http.delete<any>(this.url+'/deleteBooks/'+id);
  }

  searchBook(text: string):Observable<any>{
    
    return this.http.get<any>(this.url+'/searchBooks/'+text);
  }
}

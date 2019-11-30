import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Categoria } from '../Models/categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public result: any;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:5000/api/Library';
   }
  public url : string;

  getCategory(): Observable<any> {

    return this.http.get(this.url+'/listCategories');
  }


  saveCategory(category: Categoria) {
  
    return this.http.post<any>(this.url+'/saveCategories', category);
  }

  editCategory(category: Categoria) {
  
    return this.http.put<any>(this.url+'/updateCategories/'+category.id, category);
  }

  deleteCategory(id: string) {
    
    return this.http.delete<any>(this.url+'/deleteCategories/'+id);
  }

}

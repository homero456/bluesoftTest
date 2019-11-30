import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { Router } from '@angular/router';
import { Categoria } from '../Models/categoria';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public hiddenAdd: boolean;
  public listCategories: any;
  public categoria: Categoria;
  constructor(private router: Router, private serviceCategory: CategoryService) {

    serviceCategory.getCategory().subscribe(s => {
      this.listCategories = s;
      console.log(this.listCategories);
    });

  }

  ngOnInit() {
    this.hiddenAdd = false;
    this.categoria = new Categoria();
    this.categoria.id=0;
    console.log(this.categoria);

  }
  deleteCategory(e: Categoria): void {
    this.serviceCategory.deleteCategory(e.id.toString()).subscribe(s => {
      this.serviceCategory.getCategory().subscribe(s => {
        this.listCategories = s;
        alert("Eliminado");
      });
    });
  };
  editCategory(e: Categoria): void {

    this.hiddenAdd = true;
    this.categoria = e;
    console.log(this.categoria);

    //localStorage.removeItem("editEmpId");
    //localStorage.setItem("editEmpId", e.id.toString());
    //this.router.navigate(['edit-emp']);
  };
  addCategory(): void {
    
    console.log(this.categoria);
    if (this.categoria.id !== undefined && this.categoria.id == 0) {
      this.serviceCategory.saveCategory(this.categoria).subscribe(s => {
        this.categoria = new Categoria();

        alert("Category Saved!");

        this.hiddenAdd = false;
        this.serviceCategory.getCategory().subscribe(s => {
          this.listCategories = s;
          console.log(this.listCategories);
        });

      });
    }else{
      this.serviceCategory.editCategory(this.categoria).subscribe(s => {
        this.categoria = new Categoria();
        alert("Category Edited!");
        this.hiddenAdd = false;
        this.serviceCategory.getCategory().subscribe(s => {
          this.listCategories = s;
          console.log(this.listCategories);
        });
      });
    }

  };

  showAddCategory(): void {
    this.hiddenAdd = true;
    this.categoria = new Categoria();
    this.categoria.id=0;
  }
  cancelAddCategory(): void {
    this.hiddenAdd = false;
    this.categoria = new Categoria();
  }

}

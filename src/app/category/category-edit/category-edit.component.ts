import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  id: number;
  categoryForm: FormGroup;
  constructor(private categoryService: CategoryService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(paramap => {
        this.id = +paramap.get('id');
        this.getById(this.id);
    });
  }

  ngOnInit() {
  }

  getById(id: number) {
       return this.categoryService.getById(id).subscribe(category => {
         this.categoryForm = new FormGroup({
           id: new FormControl(category.id),
           name: new FormControl(category.name)
         });
       });
  }
  updateCategory(id: number) {
    const category = this.categoryForm.value;
    return this.categoryService.edit(id, category).subscribe(() => {
      alert('Cập nhật thông tin sản phẩm thành công!');
      this.router.navigate(['category/list']);
    });
  }


}

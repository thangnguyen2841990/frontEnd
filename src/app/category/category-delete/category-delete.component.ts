import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

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
 deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      alert('Xóa thành công!');
      this.router.navigate(['category/list']);
    });
 }

}

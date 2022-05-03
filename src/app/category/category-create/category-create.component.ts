import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)])
  });

  constructor(private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
  }

  createCategory() {
    const category = this.categoryForm.value;
    return this.categoryService.save(category).subscribe(() => {
      alert('Thêm mới danh mục sản phẩm thành công!');
      this.categoryForm.reset();
      this.router.navigate(['category/list']);
    });
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../model/category';
import {ProductService} from '../../service/product.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    price: new FormControl('', [Validators.required, Validators.min(1000)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl(''),
    categoryId: new FormControl(''),
    category: new FormControl(''),
  });

  categories: Category[] = [];

  selectedFile: File[] = [];
  imageUrl: any;
  constructor(private productService: ProductService,
              private storage: AngularFireStorage,
              private router: Router,
              private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.getAllCategories();
  }


  submit() {
    const category = this.productForm.value;
    this.productForm.patchValue({
      category: {
        id: category.categoryId,
        name: ''
      }
    });
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('quantity', this.productForm.value.quantity);
    formData.append('description', this.productForm.value.description);
    formData.append('category', this.productForm.value.category.id);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedFile.length; i++) {
      formData.append('image', this.selectedFile[i]);
    }
    console.log(formData);
    this.productService.save(formData).subscribe(() => {
      this.productForm.reset();
      alert('Thêm mới sản phẩm thành công!');
      this.router.navigate(['product/list']);
    });

  }

  changeFile($event) {
    this.selectedFile = $event.target.files;
    console.log(this.selectedFile);

  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

}

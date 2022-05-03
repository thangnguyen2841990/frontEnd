import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../model/category';
import {AngularFireStorage} from '@angular/fire/storage';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  productForm: FormGroup;
  id: number;
  imageUrl: string;
  categories: Category[] = [];


  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              private categoryService: CategoryService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.getProductById(this.id);
    });
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getProductById(id: number) {
    return this.productService.getById(id).subscribe(product => {
      this.productForm = new FormGroup({
        name: new FormControl(product.name),
        price: new FormControl(product.price),
        quantity: new FormControl(product.quantity),
        description: new FormControl(product.description),
        image: new FormControl(product.images),
        categoryId: new FormControl(product.category.id),
        category: new FormControl('')
      });
      this.imageUrl = this.productForm.value.image;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.router.navigate(['product/list']);
    });
  }
  getAllCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }
}

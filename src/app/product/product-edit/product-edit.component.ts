import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ImageService} from '../../service/image.service';
import {Image} from '../../model/image';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Product} from '../../model/product';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  id: number;
  imageUrl: any[] = [];
  categories: Category[] = [];
  selectedFile: File[] = [];
  images: Image[] = [];
  modalRef: BsModalRef;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              private categoryService: CategoryService,
              private imageService: ImageService,
              private modalService: BsModalService
  ) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.getProductById(this.id);
    });
  }

  ngOnInit() {
    this.getAllCategories();
    this.getImageById(this.id);
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
      console.log(this.imageUrl);
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

  updateProduct(id: number) {
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
    this.productService.edit(id, formData).subscribe(() => {
      this.productForm.reset();
      alert('Cập nhật sản phẩm thành công!');
      this.router.navigate(['product/list']);
    });

  }

  deleteAllImageByProductId() {
    this.imageService.deleteAllImages(this.id).subscribe(() => {
      alert('Đã xóa hết ảnh');
      this.getProductById(this.id);
      this.router.navigate([`http://localhost:4200//product/edit/${this.id}`]);
    });
  }

  getImageById(id: number) {
    this.imageService.getAll(id).subscribe(images => {
      this.images = images;
    });
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  deleteImage(id: number) {
    this.imageService.deleteImageById(id).subscribe(() => {
      alert('Xóa thành công!');
      this.getImageById(this.id);
      this.getProductById(this.id);
    });
  }

}

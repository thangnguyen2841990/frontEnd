import {Component, OnInit, TemplateRef} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {ImageService} from '../../service/image.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  indexPagination: number;
  totalPagination: number;
  currentPage: number;
  image: FormGroup;
  imageUrl: any;
  imageId: number;
  modalRef: BsModalRef;


  constructor(private productService: ProductService,
              private imageService: ImageService,
              private modalService: BsModalService,
              private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.imageId = +paramMap.get('id');
      this.getImageById(this.imageId);
    });
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    return this.productService.getAll(0).subscribe(products => {
      this.products = products.source;
      this.totalPagination = products.lastElementOnPage - 1;
      this.indexPagination = products.pageCount - 1;
      this.currentPage = this.indexPagination + 1;
    });
  }


  next() {
    this.indexPagination = this.indexPagination + 1;
    this.currentPage = this.currentPage + 1;
    this.productService.getAll(this.indexPagination).subscribe(data => {
      this.products = data.source;
    });
  }

  previous() {
    this.indexPagination = this.indexPagination - 1;
    this.currentPage = this.currentPage - 1;
    this.productService.getAll(this.indexPagination).subscribe(data => {
      this.products = data.source;
    });
  }

  first() {
    this.indexPagination = 0;
    this.currentPage = 1;
    this.productService.getAll(this.indexPagination).subscribe(data => {
      this.products = data.source;
    });
  }

  last() {
    this.indexPagination = this.totalPagination - 1;
    this.currentPage = this.totalPagination;
    this.productService.getAll(this.indexPagination).subscribe(data => {
      this.products = data.source;
    });
  }

  getImageById(id: number) {
    this.imageService.findById(id).subscribe(image => {
      this.image = new FormGroup({
        id: new FormControl(image.id),
        image: new FormControl(image.image),
      });
      this.imageUrl = this.image.value.image;
      console.log(this.imageUrl);
    });
  }

  openModalWithClass(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.getImageById(id);
  }
}

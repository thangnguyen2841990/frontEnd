import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductDeleteComponent} from './product-delete/product-delete.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from '@syncfusion/ej2-angular-popups';
import {ModalBackdropComponent, ModalContainerComponent} from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDeleteComponent,

  ],

  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    DialogModule
  ]
})
export class ProductModule {
}

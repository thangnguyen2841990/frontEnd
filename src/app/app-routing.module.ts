import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImageListComponent} from './image/image-list/image-list.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './helper/auth-guard';


const routes: Routes = [
  {
    path: 'category',
    canActivate: [AuthGuard],
    loadChildren: () => import('./category/category.module').then(module => module.CategoryModule)

  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    loadChildren: () => import('./product/product.module').then(module => module.ProductModule)
  },
  {
    path: 'image/: id',
    component: ImageListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

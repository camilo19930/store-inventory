import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../components/home/home.module';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { LoginComponent } from '../components/login/login.component';
import { ProductComponent } from '../components/product/product.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('../components/product/product.module').then(m => m.ProductModule)
  },
  {
    path: '',
    loadChildren: () => import('../components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

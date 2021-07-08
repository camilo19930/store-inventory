import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../components/home/home.module';
import { NotfoundComponent } from '../components/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../components/home/home.module').then(m => m.HomeModule)
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
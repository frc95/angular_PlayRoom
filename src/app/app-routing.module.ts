import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlueballComponent } from './pages/juegos/blueball/blueball.component';
import { MemotestComponent } from './pages/juegos/memotest/memotest.component';
import { PPTComponent } from './pages/juegos/ppt/ppt.component';
import { TatetiComponent } from './pages/juegos/tateti/tateti.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home/ppt', component: PPTComponent},
  {path: 'home/tateti', component: TatetiComponent},
  {path: 'home/memotest', component: MemotestComponent},
  {path: 'home/blueball', component: BlueballComponent},
  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

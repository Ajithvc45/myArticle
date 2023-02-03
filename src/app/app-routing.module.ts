import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';
import { AddNewComponent } from './add-new/add-new.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent, canActivate:[AuthGuard]},
  {path:'add',component:AddNewComponent, canActivate:[AuthGuard]},
  {path:'edit/:id',component:UpdateComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

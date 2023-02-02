import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddNewComponent } from './add-new/add-new.component';
import { UpdateComponent } from './update/update.component';
import { LoginComponent } from './login/login.component';
import { CardComponent,DialogOverviewExampleDialog, DialogAnimationsExampleDialog } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { NewArticlePipe } from './new-article.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddNewComponent,
    UpdateComponent,
    LoginComponent,
    HeaderComponent,
    NewArticlePipe,
    CardComponent,
    DialogOverviewExampleDialog,
    DialogAnimationsExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

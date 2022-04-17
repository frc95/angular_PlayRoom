import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PPTComponent } from './pages/juegos/ppt/ppt.component';
import { TatetiComponent } from './pages/juegos/tateti/tateti.component';
import { MemotestComponent } from './pages/juegos/memotest/memotest.component';
import { BlueballComponent } from './pages/juegos/blueball/blueball.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { ButtonTatetiComponent } from './components/teteti/button-tateti/button-tateti.component';
import { CardMemoComponent } from './components/memotest/card-memo/card-memo.component';
import { HttpClientModule } from '@angular/common/http';
import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { BackComponent } from './components/back/back.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PPTComponent,
    TatetiComponent,
    MemotestComponent,
    BlueballComponent,
    NavbarComponent,
    CardComponent,
    ButtonTatetiComponent,
    CardMemoComponent,
    MinuteSecondsPipe,
    BackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

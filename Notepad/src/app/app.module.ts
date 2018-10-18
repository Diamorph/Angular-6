import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HomeModule} from "./home/home.module";
import {UserModule} from "./user/user.module";
import {SchedulerModule} from "./scheduler/scheduler.module";
import {NotepadModule} from "./notepad/notepad.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    UserModule,
    SchedulerModule,
    NotepadModule,
    AppRoutingModule
  ],
  exports:[AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotepadComponent} from "./notepad.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations:[
    NotepadComponent
  ],
  exports: [
    NotepadComponent
  ]
})
export class NotepadModule{}

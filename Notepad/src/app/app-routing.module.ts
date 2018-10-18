import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {SchedulerComponent} from "./scheduler/scheduler.component";
import {NotepadComponent} from "./notepad/notepad.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'scheduler', component: SchedulerComponent},
  {path: 'notepad', component: NotepadComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

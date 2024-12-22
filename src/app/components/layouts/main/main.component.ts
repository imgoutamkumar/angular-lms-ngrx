import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from '../../main/main-header/main-header.component';
import { MainSidebarComponent } from '../../main/main-sidebar/main-sidebar.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterOutlet,
    MainHeaderComponent,
    MainSidebarComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}

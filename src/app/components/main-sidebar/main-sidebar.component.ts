import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-sidebar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.scss',
})
export class MainSidebarComponent {
  sidebarLinks = [
    {
      url: '/allCourses',
      icon: 'format_list_bulleted',
    },
  ];
}

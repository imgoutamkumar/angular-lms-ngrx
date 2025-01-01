import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../store/actions/auth.action';
import { selectIsAuthenticated } from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  constructor(private store: Store, private router: Router) {}
  @Output() toggleSidebar = new EventEmitter<void>();

  toggle() {
    this.toggleSidebar.emit();
  }

  logout() {
    console.log('logout called');
    this.store.dispatch(AuthActions.logout());
    this.store.select(selectIsAuthenticated).subscribe({
      next: (result) => {
        if (!result) {
          this.router.navigate(['/auth/signin']);
        }
      },
    });
  }
}

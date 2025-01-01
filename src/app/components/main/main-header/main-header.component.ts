import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../store/actions/auth.action';
import {
  selectIsAuthenticated,
  selectMessage,
} from '../../../store/selectors/auth.selectors';
import { SnackBarService } from '../../../services/snack-bar.service';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private store: Store,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}
  notifyParent() {
    this.toggleSidebar.emit();
  }

  logout() {
    console.log('logout called');
    this.store.dispatch(AuthActions.logout());
    this.store.select(selectIsAuthenticated).subscribe({
      next: (result) => {
        console.log(result);
        if (!result) {
          /* this.store
            .select(selectMessage)
            .subscribe((message) => this.snackBarService.show(message)); */
          this.router.navigate(['/auth/signin']);
        }
      },
    });
  }
}

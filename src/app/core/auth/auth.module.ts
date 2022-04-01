import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthGuestGuard } from './guard/auth-guest.guard';
import { AuthMemberGuard } from './guard/auth-member.guard';
import { AuthService } from './service/auth.service';
import { UserDataService } from './service/user-data.service';
import { AuthEffects } from './store/auth.effects';
import { AuthFacade } from './store/auth.facade';
import { authReducer } from './store/auth.reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('auth', authReducer), EffectsModule.forFeature([AuthEffects])],
  providers: [AuthFacade, AuthService, AuthGuestGuard, AuthMemberGuard, UserDataService],
})
export class AuthModule {}

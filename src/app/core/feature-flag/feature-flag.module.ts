import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagService } from './service/feature-flag.service';
import { FeatureRouteGuard } from './guard/feature-route.guard';

@NgModule({
  declarations: [],
  providers: [FeatureFlagService, FeatureRouteGuard],
  imports: [CommonModule],
})
export class FeatureFlagModule {}

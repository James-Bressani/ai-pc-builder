import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorState } from '../../services/configurator-state';

@Component({
  selector: 'app-build-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './build-summary.html',
  styleUrl: './build-summary.scss'
})
export class BuildSummary {
  private configuratorState = inject(ConfiguratorState);
  pcBuild = this.configuratorState.pcBuild;
}

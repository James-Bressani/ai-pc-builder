import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorStateService } from '../../services/configurator-state.service';

@Component({
  selector: 'app-build-summary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './build-summary.html',
  styleUrls: ['./build-summary.scss']
})
export class BuildSummaryComponent {
  public readonly state = inject(ConfiguratorStateService);
}
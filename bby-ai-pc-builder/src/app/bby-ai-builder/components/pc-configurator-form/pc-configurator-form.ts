import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorStateService } from '../../services/configurator-state.service';

@Component({
  selector: 'app-pc-configurator-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './pc-configurator-form.html',
  styleUrls: ['./pc-configurator-form.scss']
})
export class PcConfiguratorFormComponent {
  public readonly state = inject(ConfiguratorStateService);

  public onSubmit(): void {
    this.state.getRecommendations();
  }
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorStateService } from './services/configurator-state.service';
import { PcConfiguratorFormComponent } from './components/pc-configurator-form/pc-configurator-form.component';
import { BuildSummaryComponent } from './components/build-summary/build-summary.component';

@Component({
  selector: 'app-bby-ai-builder',
  standalone: true,
  imports: [
    CommonModule,
    PcConfiguratorFormComponent,
    BuildSummaryComponent
  ],
  templateUrl: './bby-ai-builder.html',
  styleUrl: './bby-ai-builder.scss'
})
export class BbyAiBuilder {
  public readonly state = inject(ConfiguratorStateService);
}

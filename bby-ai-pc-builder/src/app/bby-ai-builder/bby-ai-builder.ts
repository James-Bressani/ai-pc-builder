import { Component } from '@angular/core';
import { PcConfiguratorForm } from './components/pc-configurator-form/pc-configurator-form';
import { BuildSummary } from './components/build-summary/build-summary';

@Component({
  selector: 'app-bby-ai-builder',
  standalone: true,
  imports: [
    PcConfiguratorForm,
    BuildSummary
  ],
  templateUrl: './bby-ai-builder.html',
  styleUrl: './bby-ai-builder.scss'
})
export class BbyAiBuilder {

}
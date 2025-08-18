import { Injectable, signal } from '@angular/core';

export interface PcBuild {
  cpu: string | null;
  gpu: string | null;
  ram: string | null;
  storage: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorState {
  private readonly initialBuild: PcBuild = {
    cpu: null,
    gpu: null,
    ram: null,
    storage: null
  };

  readonly pcBuild = signal<PcBuild>(this.initialBuild);

  updateBuild(newConfig: Partial<PcBuild>) {
    this.pcBuild.update(currentBuild => ({ ...currentBuild, ...newConfig }));
  }
}

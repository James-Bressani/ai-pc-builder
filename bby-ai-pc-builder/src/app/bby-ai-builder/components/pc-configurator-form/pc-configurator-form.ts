import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ConfiguratorState, PcBuild } from '../../services/configurator-state';

@Component({
  selector: 'app-pc-configurator-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pc-configurator-form.html',
  styleUrl: './pc-configurator-form.scss'
})
export class PcConfiguratorForm implements OnInit, OnDestroy {
  pcConfiguration: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private configuratorState: ConfiguratorState
  ) {
    this.pcConfiguration = this.fb.group({
      cpu: [null as string | null],
      gpu: [null as string | null],
      ram: [null as string | null],
      storage: [null as string | null]
    });
  }

  ngOnInit(): void {
    this.pcConfiguration.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.configuratorState.updateBuild(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    console.log('Final Build:', this.configuratorState.pcBuild());
    // Here you would typically proceed to a checkout or save the build
  }
}

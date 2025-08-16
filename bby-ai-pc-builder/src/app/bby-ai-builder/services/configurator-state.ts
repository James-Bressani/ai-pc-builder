import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RecommendationRequest, RecommendationService } from './recommendation.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorStateService {
  private readonly fb = inject(FormBuilder);
  private readonly recommendationService = inject(RecommendationService);

  private readonly _configForm = new BehaviorSubject<FormGroup>(this.createForm());
  public readonly configForm$ = this._configForm.asObservable();

  private readonly _recommendationResponse = new BehaviorSubject<any>(null);
  public readonly recommendationResponse$ = this._recommendationResponse.asObservable();

  private readonly _isLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$ = this._isLoading.asObservable();

  private readonly _budgetExplanation = new BehaviorSubject<string>('');
  public readonly budgetExplanation$ = this._budgetExplanation.asObservable();

  constructor() {
    this.configForm.get('budget')?.valueChanges.subscribe(value => {
      this.updateBudgetExplanation(value);
    });
    this.updateBudgetExplanation(this.configForm.get('budget')?.value);

    this.configForm.get('useCase')?.valueChanges.subscribe(value => {
        const gamingTypeControl = this.configForm.get('gamingType');
        if (value === 'gaming') {
            gamingTypeControl?.enable();
        } else {
            gamingTypeControl?.disable();
            gamingTypeControl?.reset();
        }
    });
  }

  public get configForm(): FormGroup {
    return this._configForm.getValue();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      budget: [1000, Validators.required],
      useCase: ['gaming', Validators.required],
      gamingType: ['esports'],
      priority: ['optimized', Validators.required]
    });
  }

  public getRecommendations(): void {
    if (this.configForm.invalid) {
      return;
    }

    this._isLoading.next(true);
    const formData: RecommendationRequest = this.configForm.getRawValue();
    if (formData.useCase !== 'gaming') {
        formData.gamingType = null;
    }

    console.log('Sending to Django API:', formData);

    this.recommendationService.getRecommendations(formData).pipe(
        tap((response) => {
            this._recommendationResponse.next(response);
            this._isLoading.next(false);
        }),
        catchError(error => {
            console.error('Error calling API:', error);
            this._isLoading.next(false);
            alert('Error! Could not connect to the API. See the console for details.');
            this._recommendationResponse.next({ error: 'Failed to get recommendations. Is the Django server running?' });
            return of(null);
        })
    ).subscribe();
  }

  private updateBudgetExplanation(budget: number): void {
    if (budget < 750) {
      this._budgetExplanation.next('Entry-level system for 1080p gaming at medium settings and everyday tasks.');
    } else if (budget < 1500) {
      this._budgetExplanation.next('Solid 1080p high-settings gaming and smooth multitasking.');
    } else if (budget < 2500) {
      this._budgetExplanation.next('Excellent for 1440p gaming and streaming or content creation.');
    } else if (budget < 3500) {
      this._budgetExplanation.next('Top-tier performance for 4K gaming and professional workloads.');
    } else {
      this._budgetExplanation.next('Maxed-out builds for uncompromising 4K gaming and demanding creative work.');
    }
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecommendationRequest {
  budget: number;
  useCase: string;
  gamingType?: string | null;
  priority: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000/api/v1/recommendations/';

  getRecommendations(formData: RecommendationRequest): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}

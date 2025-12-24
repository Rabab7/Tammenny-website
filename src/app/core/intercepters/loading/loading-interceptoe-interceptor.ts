import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../../services/loadingService/loading-service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptoeInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  loadingService.busy(); 

  return next(req).pipe(
    finalize(() => {
      loadingService.idle(); 
    })
  );
  
};

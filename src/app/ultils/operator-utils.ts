import { Observable, catchError, map, of, startWith } from "rxjs";
import { ApiResponse, ApiResponseStatus } from "../constant/types";

export function getApiResponse<T>(apiCall: Observable<T>, initialValue: T): Observable<ApiResponse<T>>{
  return apiCall.pipe(
    map(data => ({status: ApiResponseStatus.Success, data, error: ''})),
    startWith({data: initialValue, status: ApiResponseStatus.Loading, error: ''}),
    catchError((err) => {
      console.error('Api error:', err);
      return of({
        status: ApiResponseStatus.Error,
        data: initialValue,
        error: err
      })
    })
  )
}

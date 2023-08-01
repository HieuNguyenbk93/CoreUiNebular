export enum ApiResponseStatus {
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

export interface ApiResponse<T = any> {
  data: T;
  status: ApiResponseStatus;
  error: string;
}

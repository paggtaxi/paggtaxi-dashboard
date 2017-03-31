import { URLSearchParams } from "@angular/http";

export interface IHttpServices {
  makeUrl(...paths: Array<any>): string;
  handlerError(error: any): void;
  setServicePath(path: string): void;
  getServicePath(): string;
  fetchQueryParams(params: Object): URLSearchParams;
}

export interface APIGetParams {
    page_size: number;
    page: number;
    start_date?: null;
    end_date?: null;
    search?: null
}
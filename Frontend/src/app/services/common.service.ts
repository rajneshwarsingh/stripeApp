import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(private http: HttpClient) {}

  /** Get Method */
  get(path) {
    return this.http
      .get<any>(`${environment.apiEndPoint}${path}`)
      .pipe(map((res) => res as any));
  }

  /** Put Method */
  put(path, body) {
    return this.http
      .put<any>(`${environment.apiEndPoint}${path}`, body)
      .pipe(map((res) => res as any));
  }

  /** POST Method */
  post(path, body) {
    return this.http
      .post<any>(`${environment.apiEndPoint}${path}`, body)
      .pipe(map((res) => res as any));
  }

  /** DELETE Method */
  delete(path, body) {
    return this.http
      .delete<any>(`${environment.apiEndPoint}${path}`, body)
      .pipe(map((res) => res as any));
  }
}

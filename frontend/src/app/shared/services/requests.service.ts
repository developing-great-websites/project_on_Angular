import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {RequestDataType} from "../../../types/request-data.type";

@Injectable({
  providedIn: 'root'
})

export class RequestsService {

  constructor(private http: HttpClient) { }

  requestForService(body: RequestDataType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', body);
  }

}

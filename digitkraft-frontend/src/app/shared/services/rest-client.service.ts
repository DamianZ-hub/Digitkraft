import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ILoginUserDTO } from "./rest-client-dtos/ILoginUserDTO";
import { IRegisterUserDTO } from "./rest-client-dtos/IRegisterUserDTO";
import { ISessionDTO } from "./rest-client-dtos/ISessionDTO";

@Injectable({
  providedIn: "root",
})
export class RestClientService {
  private getUrl = (route: string) => `${environment.apiBaseUrl}/${route}`;

  constructor(private readonly httpClient: HttpClient) {}

  register(data: IRegisterUserDTO): Observable<string> {
    return this.httpClient.post<string>(
      this.getUrl("authentication/register"),
      data
    );
  }

  login(data: ILoginUserDTO): Observable<ISessionDTO> {
    return this.httpClient.post<ISessionDTO>(
      this.getUrl("authentication/login"),
      data
    );
  }
}

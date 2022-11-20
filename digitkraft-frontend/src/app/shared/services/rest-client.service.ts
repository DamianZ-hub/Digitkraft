import { HttpClient } from "@angular/common/http";
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
    return this.httpClient.post<string>(this.getUrl("register"), data);
  }

  login(data: ILoginUserDTO): Observable<ISessionDTO> {
    return this.httpClient.post<ISessionDTO>(this.getUrl("login"), data);
  }

  exampleGet(): Observable<IExampleEntry> {
    return this.httpClient.get<IExampleEntry>(this.getUrl("entries"));
  }
}

interface IExampleEntry {
  count: number;
  entries: Array<IEntry>;
}

interface IEntry {
  api: string;
  description: string;
  auth: string;
  https: boolean;
  cors: string;
  link: string;
  category: string;
}

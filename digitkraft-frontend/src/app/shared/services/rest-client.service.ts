import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { concatMap, delay, Observable, of } from "rxjs";
import { ILoginUserDTO } from "./rest-client-dtos/ILoginUserDTO";
import { IProductListItemDto } from "./rest-client-dtos/IProductListItemDto";
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

  getProductList(name: string): Observable<Array<IProductListItemDto>> {
    // mocked data
    return of(
      [
        {
          name: "filian",
          price: 14.11,
          shortDescription:
            "filian is an independent American VTuber. She usually streams on Twitch.",
          pictureUrl: "https://i.ytimg.com/vi/yudXxMDp0PM/maxresdefault.jpg",
          productId: 1,
          category: "vtuber",
        },
        {
          name: "Nyatasha Nyanners",
          price: 24.99,
          shortDescription:
            "Nyatasha Nyanners, commonly known as Nyanners, is a female VTuber, voice actress, and singer. She is well known for her gentle voice and rap music covers.",
          pictureUrl:
            "https://yt3.ggpht.com/dAOQtlQdhw5Lweej9ilKK45pe0D3AsvVpF8iM1iSQhGceKJp9MZoGMN4KoaJFZE6tX2TB5CwDFk=s900-c-k-c0x00ffffff-no-rj",
          productId: 2,
          category: "vtuber",
        },
        {
          name: "Gawr Gura",
          price: 17,
          shortDescription:
            "Gawr Gura (がうる・ぐら) is a female English-speaking Virtual YouTuber associated with hololive, debuting in 2020 as part of hololive English first",
          pictureUrl:
            "https://yt3.ggpht.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s900-c-k-c0x00ffffff-no-rj",
          productId: 3,
          category: "vtuber",
        },
        {
          name: "Ouro Kronii",
          price: 15.69,
          shortDescription:
            "Ouro Kronii (オーロ・クロニー) is an English-language Virtual YouTuber associated with hololive. She debuted in 2021 as part of hololive -Council",
          pictureUrl:
            "https://cdn1.dotesports.com/wp-content/uploads/2022/09/05233908/Kronii.jpg",
          productId: 4,
          category: "vtuber",
        },
        {
          name: "Hakos Baelx",
          price: 11.3,
          shortDescription:
            "Bae Hakotaro (in a reference to Hamtaro) Hayko Baelz (-Ministry- persona) ... [Press Release] Second Round Auditions for VTuber Group “hololive English”",
          pictureUrl:
            "https://hololive.hololivepro.com/wp-content/uploads/2021/08/%E3%83%8F%E3%82%B3%E3%82%B9%E3%83%BB%E3%83%99%E3%83%BC%E3%83%AB%E3%82%BA.png",
          productId: 5,
          category: "vtuber",
        },
      ].filter((x) => x.name.includes(name)) as Array<IProductListItemDto>
    ).pipe(
      concatMap((item) => of(item).pipe(delay(1000))) // fake delay
    );
  }
}

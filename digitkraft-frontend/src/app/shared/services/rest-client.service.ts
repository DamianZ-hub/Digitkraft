import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "environments/environment";
import {request} from "http";
import {catchError, map, Observable, tap} from "rxjs";
import {IAddProductDto} from "./rest-client-dtos/IAddProductDto";
import {IAddOrderDto} from "./rest-client-dtos/IAddOrderDto";
import {ICategoryDto} from "./rest-client-dtos/ICategoryDto";
import {ILoginUserDTO} from "./rest-client-dtos/ILoginUserDTO";
import {IProductDto} from "./rest-client-dtos/IProductDto";
import {IRegisterUserDTO} from "./rest-client-dtos/IRegisterUserDTO";
import {ISearchBodyDto} from "./rest-client-dtos/ISearchBodyDto";
import {ISessionDTO} from "./rest-client-dtos/ISessionDTO";
import {IAddressDto} from "./rest-client-dtos/IAddressDto";

@Injectable({
    providedIn: "root",
})
export class RestClientService {
    private getUrl = (route: string) => `${environment.apiBaseUrl}/${route}`;

    constructor(private readonly httpClient: HttpClient) {
    }

    register(data: IRegisterUserDTO): Observable<string> {
        return this.httpClient.post(this.getUrl("authentication/register"), data, {
            responseType: "text",
        });
    }

    login(data: ILoginUserDTO): Observable<ISessionDTO> {
        return this.httpClient.post<ISessionDTO>(
            this.getUrl("authentication/login"),
            data
        );
    }

    getCategories(): Observable<Array<ICategoryDto>> {
        return this.httpClient.get<Array<ICategoryDto>>(this.getUrl("category"));
    }

    getProductSearch(data: ISearchBodyDto): Observable<Array<IProductDto>> {
        return this.httpClient.post<Array<IProductDto>>(
            this.getUrl("product/search"),
            data
        );
        // const params = this.objectToHttpParams(data);

        // return this.httpClient.get<Array<IProductDto>>(
        //   this.getUrl("product/search"),
        //   { params: params }
        // );
    }

    getAllProducts(): Observable<Array<IProductDto>> {
        return this.httpClient.get<Array<IProductDto>>(this.getUrl("product"));
    }

    getAddress(): Observable<IAddressDto> {
        return this.httpClient.get<IAddressDto>(this.getUrl("address"));
    }

    addProduct(data: IAddProductDto): Observable<string> {
        return this.httpClient.post(this.getUrl("product"), data, {
            responseType: "text",
        });
    }

    getProductImageFullUrl(path: string): string {
        return `${this.getUrl("product/image")}?path=${path}`;
    }

    addOrder(data: IAddOrderDto): Observable<string> {
        return this.httpClient.post(this.getUrl("order"), data, {
            responseType: "text",
        });
    }

    private objectToHttpParams(data: any): HttpParams {
        let params = new HttpParams();

        for (const [key, value] of Object.entries(data)) {
            params = params.append(key, JSON.stringify(value));
        }

        return params;
    }
}

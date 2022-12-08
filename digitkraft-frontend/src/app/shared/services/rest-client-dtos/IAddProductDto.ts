import { ICategoryDto } from "./ICategoryDto";
import { ICopyDto } from "./ICopyDto";
import { IProductImageDto } from "./IProductImageDto";

export interface IAddProductDto {
  name: string;
  price: number;
  description: string;
  category: string;
  copies: ICopyDto;
  productImages: Array<IProductImageDto>;
  fileName: string;
  base64Content: string;
}

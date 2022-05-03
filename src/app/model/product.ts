import {Category} from './category';

export interface Product {
  id?: number;
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  images?: any[];
  category?: Category;
}

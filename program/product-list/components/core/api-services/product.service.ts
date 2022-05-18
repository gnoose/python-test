import {doGet} from './http';
import { Product } from '../types/products';

export const ProductService = {
  getProducts: (quality: string): Promise<string> => {
    return doGet(`/products${quality ? '?quality=' + quality : ''}`);
  }
}
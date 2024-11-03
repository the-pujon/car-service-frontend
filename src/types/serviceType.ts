export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  duration?: number;
}

export type TService = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  duration?: number;
};

export type TServicePerformance = TService & {
  revenue: number;
  bookings: number;
  averageRevenue: number;
};

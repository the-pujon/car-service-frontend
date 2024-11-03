import { TService } from "./serviceType";
import { TSlot } from "./slotType";
import { TUser } from "./userType";

export type TBooking = {
  _id: string;
  customer: TUser;
  service: TService;
  slot: TSlot;
  status: "pending" | "completed" | "cancelled" | "processing";
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  registrationPlate: string;
};

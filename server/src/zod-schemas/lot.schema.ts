import { ticket } from "@/db/schemas/db.schema.js";
import { exit } from "node:process";
import { z } from "zod";


export const InitLotDataSchema = z.object({
  name: z.string().min(1, "Name is required" ).max(100, "Name must be at most 100 characters"),
  gates: z.array(
    z.object({
      name: z.string().min(1, "Gate name is required").max(50, "Gate name must be at most 50 characters"),
      type: z.enum(["Entry", "Exit"])
    })
  ),
  vehicleCategories: z.array(
    z.object({
      name: z.string().min(1, "Category is required").max(50, "Category must be at most 50 characters"),
      fare: z.number().positive("Fare must be a positive number")
    })
  ),
  slotsCategories: z.array(
    z.object({
      name: z.string().min(1, "Slot name is required").max(50, "Slot name must be at most 50 characters"),
      capacity: z.number().int().nonnegative("Capacity must be a non-negative integer")
    })
  )
});
export type InitLotDataSchema = z.infer<typeof InitLotDataSchema>;
/* Example request body:
{
  "name": "Downtown Parking Lot", 
  "gates": [
    {
      "name": "Main Entrance",
      "type": "Entry"
    }
  ],
  "vehicleCategories": [
    {
      "category": "Car",
      "fare": 5.0
    }
  ],
  "vehicleSlots": [
    {
      "name": "Car",
      "capacity": 50
    }
  ]
}
*/


export const staticLotDetailsSchema = z.object({
  lotId: z.uuid("Lot ID must be a valid UUID")
});
export type StaticLotDetailsSchema = z.infer<typeof staticLotDetailsSchema>;


export const vehicleEntrySchema = z.object({
  vehiclePlate: z.string().min(1, "Vehicle Plate Id is required").max(20, "Vehicle Plate Id must be at most 20 characters"),
  vehicleCategoryId: z.uuid("Vehicle Category Id must be a valid UUID"),
  entryGateId: z.uuid("Entry Gate Id must be a valid UUID")
  //TODO: preferably implement redis to cache the lots' categories and validate them as enum at the validation layer instead of just string validation*/
});
export type VehicleEntrySchema = z.infer<typeof vehicleEntrySchema>;


export const vehicleExitSchema = z.object({
  ticketId: z.uuid("Ticket Id must be a valid UUID"), // lot id inferred from ticket id
  exitGateId: z.uuid("Exit Gate Id must be a valid UUID"),
  amountPaid: z.number().positive("Amount Paid must be a positive number")
});
export type VehicleExitSchema = z.infer<typeof vehicleExitSchema>;
  
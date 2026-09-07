import { z } from "zod";


export const postLotSchema = z.object({
  name: z.string().min(1, "Name is required" ).max(100, "Name must be at most 100 characters"),
  gates: z.array(
    z.object({
      name: z.string().min(1, "Gate name is required").max(50, "Gate name must be at most 50 characters"),
      type: z.enum(["Entry", "Exit"])
    })
  ),
  vehicleCategories: z.array(
    z.object({
      category: z.string().min(1, "Category is required").max(50, "Category must be at most 50 characters"),
      fare: z.number().positive("Fare must be a positive number")
    })
  ),
  vehicleSlots: z.array(
    z.object({
      name: z.string().min(1, "Slot name is required").max(50, "Slot name must be at most 50 characters"),
      capacity: z.number().int().nonnegative("Capacity must be a non-negative integer")
    })
  )
});

export type PostLotSchema = z.infer<typeof postLotSchema>;


export const postVehicleEntrySchema = z.object({
  lotId: z.string().min(1, "Lot ID is required").max(50, "Lot ID must be at most 50 characters"),
  plateId: z.string().min(1, "Plate ID is required").max(20, "Plate ID must be at most 20 characters"),
  categoryId: z.uuid().min(1, "Category is required").max(50, "Category must be at most 50 characters"),
  /* for now, category id is acceptable to not be validated against the lot's categories at the validation layer and rather at the db layer as MVP, 
  but in future, I plan to preferably use redis to cache the lot's categories and validate against that at the validation layer, 
  to avoid unnecessary db calls for validation */
  
});

export type PostVehicleEntrySchema = z.infer<typeof postVehicleEntrySchema>;

/*
Sample request body for creating a parking lot:
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
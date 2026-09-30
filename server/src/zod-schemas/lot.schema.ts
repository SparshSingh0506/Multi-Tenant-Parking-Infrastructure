import { z } from "zod";

export const createLotSchema = z.object({
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
  slotsCategories: z.array(
    z.object({
      category: z.string().min(1, "Category is required").max(50, "Category must be at most 50 characters"),
      capacity: z.number().int().nonnegative("Capacity must be a non-negative integer")
    })
  ),
  vehicleSlotCategories: z.array(
    z.object({
      vehicleCategory: z.string().min(1, "Vehicle category is required").max(50, "Vehicle category must be at most 50 characters"),
      slotCategory: z.string().min(1, "Slot category is required").max(50, "Slot category must be at most 50 characters")
    })
  )
});
// TODO: Add business validation for unique categories, positive fares/capacities, and valid mappings.
export type CreateLotSchema = z.infer<typeof createLotSchema>;

/* Example request body:
{
  "name": "Downtown Parking Lot", 
  "gates": [
    {
      "name": "Main Entrance",
      "type": "Entry"
    },
    {
      "name": "Main Exit",
      "type": "Exit"
    }
  ],
  "vehicleCategories": [
    {
      "category": "Car",
      "fare": 5.0
    }
  ],
  "slotsCategories": [
    {
      "category": "General",
      "capacity": 50
    }
  ],
  "vehicleSlotCategories": [
    {
      "vehicleCategory": "Car",
      "slotCategory": "General"
    }
  ]
}
*/


export const joinLotSchema = z.object({
  joinToken: z.string().min(1, "Token is required").max(10, "Token must be at most 10 characters")
});
export type JoinLotSchema = z.infer<typeof joinLotSchema>;


export const lotIdParamSchema = z.object({
  lotId: z.uuid("Lot ID must be a valid UUID")
});
export type LotIdParamSchema = z.infer<typeof lotIdParamSchema>;


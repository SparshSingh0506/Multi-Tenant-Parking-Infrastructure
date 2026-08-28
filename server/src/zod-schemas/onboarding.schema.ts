import {z} from "zod";

export const onboardingSchema = z.object({
  lotName: z.string().min(1, "Parking lot name is required"),

  lotCapacity: z.number().min(1, "Parking lot capacity must be at least 1"),

  gates: z.array(z.object({
    name: z.string().min(1, "Gate name is required"),
    type: z.enum(["Entry", "Exit"], "Gate type must be either 'Entry' or 'Exit'"),
  })),
  
  operators: z.array(z.object({
    name: z.string().min(1, "Operator name is required"),
    email: z.email("Invalid operator email"),
  })),
});
import { createLotDetails } from "@/repository/lot.repo.js";
import type { PostLotSchema } from "@/zod-schemas/lot.schema.js";


export const postLotService = async (data: PostLotSchema) => {
  try{
    const result = await createLotDetails(data);
  
    return result;
  }
  
  catch(error){
    throw error;
  }
}
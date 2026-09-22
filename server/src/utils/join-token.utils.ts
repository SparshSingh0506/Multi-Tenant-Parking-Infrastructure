import { nanoid } from "nanoid";

export const generateJoinToken = () => {
  return nanoid(10);
}
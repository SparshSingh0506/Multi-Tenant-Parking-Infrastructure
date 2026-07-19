/*
Vehicle stops at entry gate
Operator checks parking occupied
Operator registers nameplate & vehicle type
Partial parking session (entry details) is created & Token is generated 
Vehicle enters the lot with the token
Vehicle spends time parked
Vehicle stops at exit gate
Token is handed to operator
Token session id is matched
Fare is calculated based on in & out time + vehicle type and details are sent to operator
Payment is recorded
Vehicle owner does payment to operator
Vehicle leaves the lot
Backend invalidates token
*/

import { ParkingLot, Gate, type Vehicle, Operator, Organization, Admin, ParkingSession } from "./organization";

const op0 = new Operator("0");
const op1 = new Operator("1");

const admin = new Admin("0");

const entryG = new Gate("0", "Entry", ["Small"], op0)
const exitG = new Gate("1", "Exit", ["Small"], op1)

const parking = new ParkingLot(10, 0, [entryG, exitG], []);

const org = new Organization(parking, [admin], [op0, op1]);



// ENTRY
const {token, session} = vehicleEntry({id: "0", type: "Small"}, entryG.id);

export function vehicleEntry(vehicle: Vehicle, gateId: string) {
  if (!checkSlotAvailable(parking)) throw new Error("Capacity Full!");
  
  const session = registerVehicle(vehicle, gateId);
  
  const token = generateToken(session);
  
  storeParkingSession(parking, session);

  increaseOccupancy(parking);

  return {token, session}; // dummy
}

export function checkSlotAvailable(parking: ParkingLot) {
  const available = parking.getAvailableSlots();
  return Boolean(available);
}

export function registerVehicle(vehicle: Vehicle, gateId: string) {
  return new ParkingSession("dummy id", vehicle, gateId, "10am");
}

type Token = Pick<ParkingSession, "sessionId" | "vehicle" | "entryTime" | "entryGateId">;

export function generateToken(session: ParkingSession): Token {
  const { sessionId, vehicle, entryTime, entryGateId } = session;

  return {
    sessionId,
    vehicle,
    entryTime,
    entryGateId
  }
}

export function storeParkingSession(parking: ParkingLot, session: ParkingSession) {
  parking.addParkingSession(session);
}

export function increaseOccupancy(parking: ParkingLot) {
  parking.incOccupiedSlots();
}


// EXIT
vehicleExit(token, exitG.id);

export function vehicleExit(token: Token, gateId: string) {
  validateToken(token);
  const amt = calculateFare(token, "12pm", gateId);
  closeSession(session, token, "12pm", gateId, amt);

  console.log(session)
}

export function validateToken(token: Token) {
  // find session from db with the token session id, throw error if not found
  return true; // assumption - found
}

export function calculateFare(token: Token, exitTime: string, exitGateId: string) {
  //calculation logic
  return 10; //dummy
}

export function closeSession(session: ParkingSession, token: Token, exitTime: string, exitGateId: string, amountPaid: number) {
  session.exitTime = exitTime;
  session.exitGateId = exitGateId;
  session.amountPaid = amountPaid;

  session.close();
}

export type VehicleType = "Small" | "Medium" | "Large"; // dummy
export type MovementType = "Entry" | "Exit";


export interface Vehicle {
  id: string, //nameplate as id
  type: VehicleType
}

export class Operator {
  constructor (
    id: string
  ) {}
}

export class Gate {
  constructor(
    public id: string,
    public movementType: MovementType,
    public allowedVehicleTypes: VehicleType[],
    public assignedOperator: Operator
  ) {}
  
  assignOperator(operator: Operator) {}
  removeOperator(operator: Operator) {}

  setAllowedVehicleTypes(vehicleTypes: VehicleType[]) {}

  setMovementType(movementType: MovementType) {}
}

export class Admin {
  constructor (
    id: string
  ) {}
}

export type SessionStatus = "Active" | "Inactive";

export class ParkingSession {
  public exitTime?: string;
  public exitGateId?: string;
  public amountPaid?: number;
  public sessionStatus: SessionStatus = "Active";
  
  constructor (
    public sessionId: string,
    public vehicle: Vehicle,
    public entryGateId: string,
    public entryTime: string,
  ) {}
  
  public close() {
    this.sessionStatus = "Inactive";
  }

  setExitDetails(exitTime: string, exitGateId: string) {
    this.exitTime = exitTime;
    this.exitGateId = exitGateId;
    
    this.close();
  }
}

export class ParkingLot {
  constructor (
    public capacity: number,
    public occupied: number,
    public gates: Gate[],
    public activeParkingSessions: ParkingSession[]
  ) {}

  // admin authorized
  public setCapacity(capacity: number) {}
  public getCapacity() {}

  public addGate(gate: Gate) {}
  public removeGate(gate: Gate) {}

  public incOccupiedSlots() {
    if (this.occupied == this.capacity) throw new Error("Capacity full");
    this.occupied++;
  };

  public decOccupiedSlots() {
    if (this.occupied == 0) throw new Error("Lot empty");
    this.occupied--;
  };

  public getOccupiedSlots() {
    return this.occupied;
  };
  
  public getAvailableSlots() {
    return this.capacity - this.occupied;
  };

  public addParkingSession(session: ParkingSession) {
    this.activeParkingSessions.push(session);
  }
}

export class Organization {
  constructor (
    public parkingLot: ParkingLot,
    public admins: Admin[],
    public operators: Operator[],
  ) {}

  addAdmin(admin: Admin) {}
  removeAdmin(admin: Admin) {}

  // admin authorized
  addOperator(operator: Operator) {} 
  removeOperator(operator: Operator) {}
}


// uncertain methods - could be in between a workflow
  // registerVehicleAndIssueToken(vehicle: Vehicle) {} 
  // validateTokenAndPayment(vehicle: Vehicle) {} 
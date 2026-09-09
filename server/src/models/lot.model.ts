import { tr } from "zod/locales";

export type gateType = "Entry" | "Exit";


export interface Vehicle {
  id: string, //nameplate as id
}

export class Operator {
  constructor (
    id: string,
    name: string
  ) {}
}

export class Gate {
  constructor(
    public id: string,
    public type: gateType,
    public assignedOperator: Operator
  ) {}
  
  assignOperator(operator: Operator) {}
  removeOperator(operator: Operator) {}

  setMovementType(type: gateType) {}
}

export class Manager {
  constructor (
    id: string,
    name: string
  ) {}
}

export class Ticket {
  public exitTime?: string;
  public exitGateId?: string;
  public amountPaid?: number;
  public isClosed: boolean = false;
  
  constructor (
    public sessionId: string,
    public vehicle: Vehicle,
    public entryGateId: string,
    public entryTime: string,
  ) {}
  
  public close() {
    this.isClosed = true;
  }

  setExitDetails(exitTime: string, exitGateId: string) {
    this.exitTime = exitTime;
    this.exitGateId = exitGateId;
    
    this.close();
  }
}

export class Lot {
  constructor (
    public capacity: number,
    public occupied: number,
    public gates: Gate[],
    public activeParkingSessions: Ticket[]
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

  public addParkingSession(ticket: Ticket) {
    this.activeParkingSessions.push(ticket);
  }
}

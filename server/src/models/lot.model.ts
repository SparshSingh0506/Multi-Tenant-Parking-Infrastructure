export type gateType = "Entry" | "Exit";


// export interface Vehicle {
//   id: string, //nameplate as id
// }

export class Operator {
  constructor (
    public id: string,
    public name: string
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
    public id: string,
    public name: string
  ) {}
}

interface InitialTicketDetails {
  lotId: string;
  categoryId: string;
  plateId: string;
  entryGateId: string;
  entryTime: string;
}


export class Ticket {
  isClosed: boolean = false;

  constructor (public details: InitialTicketDetails) {}

  exitTime?: string;
  exitGateId?: string;
  amountPaid?: number;
  
  private close() {
    this.isClosed = true;
  }

  public setExitDetails(exitTime: string, exitGateId: string, amountPaid: number) {
    this.exitTime = exitTime;
    this.exitGateId = exitGateId;
    this.amountPaid = amountPaid;
  
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

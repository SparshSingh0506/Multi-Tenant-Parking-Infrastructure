export interface InitTicket {
  lotId: string,
  vehiclePlate: string,
  vehicleCategoryId: string,
  entryGateId: string
}

export interface CloseTicket {
  ticketId: string,
  exitGateId: string,
  amountPaid: number
}
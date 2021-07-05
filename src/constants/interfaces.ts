export enum ServerStatus {
  BUSY = "BUSY",
  IDLE = "IDLE"
}

export interface IServer {
  status: ServerStatus
  setCustomerServiceTime: (time: number) => void
  getCustomerServiceTime: () => number
  setServerCustomerID: (customerNumber: string) => void
  getServerCustomerID: () => string
  setServerStatus: (status: ServerStatus) => void
  getServerID: () => string
  setServerID: (serverID: string) => void
}

export interface ICustomer {
  setServerCustomerID: (customerNumber: string) => void
  getServerCustomerID: () => string
  setServerCustomerName: (customerName: string) => void
  getServerCustomerName: () => string
  setCustomerServiceTime: (time: number) => void
  getCustomerServiceTime: () => number
}

export interface IQueue {
  setCurrentCustomer: (customerID: string) => void
  getCurrentCustomer: () => string
  runQuery: (queryObject: IQuery) => void
  getCustomerList: () => ICustomer[]
  setCustomerList: (customerList: ICustomer[]) => void
  removeCustomer: (customerID: string) => void
}

export enum QueryMethod {
  "POST", "GET", "PATCH", "PUT", "DELETE"
}

export interface IQuery {
  method: QueryMethod
  requestBody: object
}

export interface Request {
  customer: ICustomer
  query: IQuery
  type: ServerInstance
}

export enum ServerInstance {
  REVIEW = "REVIEW",
  USER = "USER",
  PRODUCT = "PRODUCT"
}
import { ICustomer } from "./constants/interfaces"

export class Customer implements ICustomer {
  private customerServiceTime = 0
  private customerID: string = ""
  private customerName = ""
  setCustomerServiceTime = (serviceTime: number) => this.customerServiceTime = serviceTime
  getCustomerServiceTime = () => this.customerServiceTime

  setServerCustomerID = (customerID: string) => this.customerID = customerID
  getServerCustomerID = () => this.customerID

  setServerCustomerName = (customerName: string) => this.customerName = customerName
  getServerCustomerName = () => this.customerName
}
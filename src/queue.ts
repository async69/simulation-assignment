import { IQueue, IQuery, ICustomer, ServerStatus, Request } from "./constants/interfaces"
import { Server } from "./server"
import Faker from "faker"

export class Queue implements IQueue {
  private currentCutomer: string = ""
  private customerList: ICustomer[] = []
  private requestList: Request[] = []
  private reviewServer: Server = new Server()

  setCurrentCustomer = (customerID: string) => this.currentCutomer = customerID
  getCurrentCustomer = () => this.currentCutomer
  runQuery = (queryObject: IQuery) => {
    console.log("============Running Query==========")
    console.log(`Method Type ${queryObject.method}`)
    console.log(`Request Body ${queryObject.requestBody}`)
  }

  setRequestList = (requestList: Request[]) => this.requestList = requestList
  getRequestList = () => this.requestList

  setCustomerList = (customerList: ICustomer[]) => this.customerList = customerList
  getCustomerList = () => this.customerList

  removeCustomer = (customerID: string) => {
    this.customerList = this.customerList
      .filter(customer => customer.getServerCustomerID() !== customerID)
  }

  successReview = () => {
    this.reviewServer.setServerStatus(ServerStatus.IDLE)
    this.customerList.shift()
    this.runQueue()
  }

  runQueue = () => {
    if (this.customerList.length === 0) {
      console.log("No Customers right now")
      return null
    }
    console.log("Running Queue")
    this.reviewServer.setServerID(Faker.lorem.text())
    console.log(this.customerList)
    // this.customerList.forEach((customer, idx) => {
    //   this.reviewServer.setCustomerServiceTime(customer.getCustomerServiceTime())
    //   this.reviewServer.setServerCustomerID(customer.getServerCustomerID())
    //   this.reviewServer.ServeCustomer(this.requestList[idx])
    // })
    this.customerList.forEach((customer, idx) => {
      this.reviewServer.setCustomerServiceTime(customer.getCustomerServiceTime())
      this.reviewServer.setServerCustomerID(customer.getServerCustomerID())
      this.reviewServer.ServeCustomer(this.requestList[idx])
    })
    console.log(this.reviewServer.getTimeDelays())
  }

  ServerCallback = (customerID: string) => {

  }
}
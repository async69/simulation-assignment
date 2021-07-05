import { IQueue, IQuery, ICustomer, ServerStatus, Request, ServerInstance } from "./constants/interfaces"
import { Server } from "./server"
import Faker from "faker"

export class Queue implements IQueue {
  private currentCutomer: string = ""
  private customerList: ICustomer[] = []
  private requestList: Request[] = []
  private reviewServer: Server = new Server()
  private productServer: Server = new Server()
  private userServer: Server = new Server()

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
    this.userServer.setServerID(Faker.lorem.text())
    this.productServer.setServerID(Faker.lorem.text())
    this.requestList.forEach((request, idx) => {
      let customer = this.customerList[idx]
      switch (request.type) {
        case ServerInstance.PRODUCT: {
          this.productServer.setCustomerServiceTime(customer.getCustomerServiceTime())
          this.productServer.setServerCustomerID(customer.getServerCustomerID())
          this.productServer.ServeCustomer(this.requestList[idx])
          break
        }
        case ServerInstance.REVIEW: {
          this.reviewServer.setCustomerServiceTime(customer.getCustomerServiceTime())
          this.reviewServer.setServerCustomerID(customer.getServerCustomerID())
          this.reviewServer.ServeCustomer(this.requestList[idx])
          break
        }
        case ServerInstance.USER: {
          this.userServer.setCustomerServiceTime(customer.getCustomerServiceTime())
          this.userServer.setServerCustomerID(customer.getServerCustomerID())
          this.userServer.ServeCustomer(this.requestList[idx])
          break
        }
      }
    })
    console.log("==================Review Server Time Delays=====================")
    console.log(this.reviewServer.getTimeDelays())
    console.log("----------------------------------------------------------------")
    console.log("==================User Server Time Delays=======================")
    console.log(this.userServer.getTimeDelays())
    console.log("----------------------------------------------------------------")
    console.log("==================Product Time Delays===========================")
    console.log(this.productServer.getTimeDelays())
    console.log("----------------------------------------------------------------")
  }

  ServerCallback = (customerID: string) => {

  }
}
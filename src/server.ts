import { IServer, ServerStatus, Request } from "./constants/interfaces"
import { sleep } from "./utils"

export class Server implements IServer {
  status = ServerStatus.IDLE
  private customerServiceTime = 0
  private currentCustomerID: string = ""
  private serverID = ""
  private timeDelays: number[] = []

  private successCallback = () => null

  getTimeDelays = () => this.timeDelays
  
  setCustomerServiceTime = (serviceTime: number) => this.customerServiceTime = serviceTime
  getCustomerServiceTime = () => this.customerServiceTime

  setServerID = (serverID: string) => this.serverID = serverID
  getServerID = () => this.serverID

  setServerCustomerID = (customerID: string) => this.currentCustomerID = customerID
  getServerCustomerID = () => this.currentCustomerID

  setServerStatus = (status: ServerStatus) => this.status = status

  ServeCustomer = (request: Request) => {
    if (this.status === ServerStatus.IDLE) {
      this.setServerCustomerID(request.customer.getServerCustomerID())
      this.setCustomerServiceTime(request.customer.getCustomerServiceTime())
      this.setServerStatus(ServerStatus.BUSY)
      console.log(`Customer ${this.currentCustomerID}, please wait for ${this.customerServiceTime} seconds`)
      console.log(`You request to ${request.query.requestBody}`)
      sleep(this.customerServiceTime).then(() => {
        this.setServerStatus(ServerStatus.IDLE)
        console.log(`Served customer ${this.currentCustomerID}`)
      })
    } {
      console.log("Server not idle")
      this.timeDelays.push(Math.floor(Math.random() * 10))
    }
  }

  setCallback = (callback: any) => this.successCallback = callback

  DoneCallback = () => {
    this.setServerStatus(ServerStatus.IDLE)
    this.successCallback()
  }
}
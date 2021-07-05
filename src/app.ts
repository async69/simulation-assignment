import { promisify } from "util"
import { ServerStatus, ICustomer, Request, QueryMethod } from "./constants/interfaces"
import { Customer } from "./customer"
import { Queue } from "./queue"
import { Server } from "./server"
import Faker from "faker"

console.log("Grocery Ordering Simulation")

const customerInterArrivalTimes = Array(10).fill(0).map(() => Math.floor(Math.random() * 10) + 1)
const serviceTimes = Array(10).fill(0).map(() => Math.floor(Math.random() * 10) + 1)

const SimultationRun = async () => {
  const customerList = Array(10).fill("").map(() => {
    const NewCustomer = new Customer()
    NewCustomer.setCustomerServiceTime((Math.floor(Math.random() * 10) % 5) + 1)
    NewCustomer.setServerCustomerID(Faker.address.zipCode())
    NewCustomer.setServerCustomerName(Faker.name.firstName())
    return NewCustomer
  })

  const requestList: Request[] = Array(10).fill("").map((_, idx) => {
    const request: Request = {
      customer: customerList[idx],
      query: {
        method: QueryMethod.GET,
        requestBody: {
          reviewID: Faker.lorem.text(),
          action: "REMOVE"
        }
      }
    }
    return request
  })

  const queueObject = new Queue()
  queueObject.setCustomerList(customerList)
  queueObject.setRequestList(requestList)
  queueObject.runQueue()
}

SimultationRun()
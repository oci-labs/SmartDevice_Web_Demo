package com.nexmatix

class Valve {

    Long serialNumber
    String sku
    ValveStatus latestStatus
    Long fabricationDate
    Long shippingDate
    Long updateTime
    Station station

    static constraints = {
        latestStatus nullable: true
    }
}

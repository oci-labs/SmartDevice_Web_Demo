package com.nexmatix

class Valve {

    String serialNumber
    String sku
    ValveStatus latestStatus
    Station station

    static constraints = {
        latestStatus nullable: true
    }
}

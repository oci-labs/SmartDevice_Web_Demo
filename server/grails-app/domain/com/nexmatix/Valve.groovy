package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/valve', formats = ['json'], readOnly = false)
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

package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/valve')
class Valve {

    Long serialNumber
    String sku
    ValveStatus latestStatus
    Long fabricationDate
    Long shippingDate
    Long updateTime
    Integer manifoldSerialNumber
    Integer stationNumber

    static constraints = {
        latestStatus nullable: true
    }


    static mapping =  {
        datasource "smartDeviceDataSource"

        serialNumber column: 'valve_sn'
        fabricationDate column: 'fab_date'
        shippingDate column: "ship_date"
        stationNumber column: "station_num"
        manifoldSerialNumber column:"manifold_sn"
    }


    Station getStation() {
        return Station.findByManifoldAndNumber(Manifold.findBySerialNumber(manifoldSerialNumber), stationNumber)
    }

}

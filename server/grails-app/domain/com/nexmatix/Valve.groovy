package com.nexmatix

import grails.rest.Resource

class Valve {

    Integer serialNumber
    String sku
    Date fabricationDate
    Date shippingDate
    Integer manifoldSerialNumber
    Integer stationNumber
    Date updateTime
    Integer cycleCountLimit

    static constraints = {
        fabricationDate nullable: true
        shippingDate nullable: true
        sku nullable: true, maxSize: 50
        stationNumber nullable: true
        cycleCountLimit nullable: true
        manifoldSerialNumber nullable: true
    }

    static mapping =  {
        datasource "smartDeviceConnection"
        version false
        id name: 'serialNumber', generator: 'assigned'
        cycleCountLimit column: 'ccl'
        serialNumber column: 'valve_sn'
        fabricationDate column: 'fab_date', sqlType: "date"
        shippingDate column: "ship_date", sqlType: "date"
        stationNumber column: "station_num"
        manifoldSerialNumber column:"manifold_sn"
        updateTime column: 'timestamp', sqlType: 'timestamp'
    }


    Station getStation() {
        return Station.findByManifoldAndNumber(Manifold.findBySerialNumber(manifoldSerialNumber), stationNumber)
    }

}

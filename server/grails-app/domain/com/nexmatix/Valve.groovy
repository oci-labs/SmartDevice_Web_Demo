package com.nexmatix

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


    Manifold getManifold() {
        Manifold m = Manifold.findBySerialNumber(manifoldSerialNumber)
        if(!m) {
            println "Missing manifold - creating...."
            m = new Manifold(serialNumber: manifoldSerialNumber, machine: Machine.first())
            println "new manifold: ${m}"
            Station s = new Station(manifold: m, number: stationNumber)
            println "new station: ${s}"
            m.addToStations(s)

            if(!m.save(flush: true)) {
                m.errors.allErrors.each { println it }
            }
            println "Created manifold: ${m.serialNumber}"
        }

        m
    }

    Station getStation() {
        Manifold m = manifold
        Station s = Station.findByManifoldAndNumber(m, stationNumber)
        if(!s) {
            println "Missing station ${stationNumber}, creating..."
            s = new Station(manifold: m, number: stationNumber)
            s.save(flush: true)
            println "Created station: ${s.number}"
        }

        s
    }

}

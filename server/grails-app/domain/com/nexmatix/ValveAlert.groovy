package com.nexmatix

class ValveAlert {

    String name
    Date detectionTime
    String alertType
    Integer valveSerialNumber
    Integer stationNumber
    Integer manifoldSerialNumber

    static mapping = {
        datasource "smartDeviceDataSource"

        detectionTime column: "detection_time"
        alertType column: "alert_type"
        valveSerialNumber column: "valve_sn"
        stationNumber column: "station_num"
        manifoldSerialNumber column:"manifold_sn"
    }

    String getDescription() {
        "No description column"
    }

    Valve getValve() {
        return Valve.findBySerialNumber(valveSerialNumber)
    }

    static constraints = {
    }
}

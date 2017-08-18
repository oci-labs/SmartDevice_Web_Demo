package com.nexmatix

import groovy.transform.EqualsAndHashCode
import org.apache.commons.lang.builder.HashCodeBuilder

class ValveAlert implements Serializable {

    Date detectionTime
    String alertType
    Integer valveSerialNumber
    Integer stationNumber
    Integer manifoldSerialNumber

    static constraints = {
        manifoldSerialNumber nullable: true, maxSize: 11
        stationNumber nullable: true, maxSize: 11
    }

    static mapping = {
        datasource "smartDeviceConnection"
        id composite: ['alertType', 'valveSerialNumber'], generator: 'assigned'
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
        return Valve.get(valveSerialNumber)
    }


    boolean equals(other) {
        if (!(other instanceof ValveAlert)) {
            return false
        }

        (other.alertType == alertType
                && other.valveSerialNumber == valveSerialNumber)
    }

    int hashCode() {
        def builder = new HashCodeBuilder()
        builder.append alertType
        builder.append valveSerialNumber
        builder.toHashCode()
    }

}

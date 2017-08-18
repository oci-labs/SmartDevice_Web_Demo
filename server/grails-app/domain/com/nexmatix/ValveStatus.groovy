package com.nexmatix

import groovy.transform.EqualsAndHashCode
import org.apache.commons.lang.builder.HashCodeBuilder

class ValveStatus implements Serializable {

    Integer cycleCount
    Integer cycleCountLimit
    String input
    String leak
    Integer manifoldSerialNumber
    Integer stationNumber
    Integer valveSerialNumber
    String pressureFault
    Float pressurePoint
    Date updateTime

    static mapping = {
        datasource "smartDeviceConnection"
        id composite: ['manifoldSerialNumber', 'stationNumber', 'valveSerialNumber'], generator: 'assigned'
        version false
        cycleCount column: 'cc'
        cycleCountLimit column: 'ccl'
        pressureFault column: 'p_fault'
        pressurePoint column: 'pp'
        stationNumber column: "station_num"
        manifoldSerialNumber column:"manifold_sn"
        valveSerialNumber column: 'valve_sn'
        updateTime column:"timestamp"
    }


    boolean equals(other) {
        if (!(other instanceof ValveStatus)) {
            return false
        }

        (other.manifoldSerialNumber == manifoldSerialNumber
                && other.stationNumber == stationNumber
                && other.valveSerialNumber == valveSerialNumber)
    }

    int hashCode() {
        def builder = new HashCodeBuilder()
        builder.append manifoldSerialNumber
        builder.append stationNumber
        builder.append valveSerialNumber
        builder.toHashCode()
    }
}

package com.nexmatix

import com.nexmatix.Station
import com.nexmatix.Valve
import com.nexmatix.model.ValveDetails
import grails.gorm.transactions.Transactional

/**
 * Created by zak on 7/25/17.
 */
class ValveStatus {

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

        cycleCount column: 'cc'
        cycleCountLimit column: 'ccl'
        pressureFault column: 'p_fault'
        pressurePoint column: 'pp'
        stationNumber column: "station_num"
        manifoldSerialNumber column:"manifold_sn"
        updateTime column:"timestamp"
        updateTime column:"timestamp"
    }
}

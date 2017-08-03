package com.nexmatix

import com.nexmatix.Station
import com.nexmatix.Valve
import com.nexmatix.model.ValveDetails

/**
 * Created by zak on 7/25/17.
 */
class ValveStatus implements ValveDetails {

    Map getOutputProperties() {
        [valve          : [id: valve.id],
         updateTime     : updateTime,
         cycleCount     : cycleCount,
         cycleCountLimit: cycleCountLimit,
         input          : input,
         leak           : leak,
         pressureFault  : pressureFault,
         pressurePoint  : pressurePoint]
    }

    static constraints = {
        valve nullable: true
    }

    Station getStation() {
        return valve.station

    }
}

package com.nexmatix.model

import com.nexmatix.Station

/**
 * Created by zak on 7/25/17.
 */
class ValveRecord {

    Integer cycleCounts
    Integer faults
    Integer inputs
    Integer pressure
    Long station

    public ValveRecord(c, f, i, p, s) {
        cycleCounts = c
        faults = f
        inputs = i
        pressure = p
        station = s
    }


    Map getOutputProperties(){
        [cycleCounts: cycleCounts, faults: faults, inputs: inputs, pressure: pressure, station: station]
    }

    Station getStation() {
        Station.withNewSession {
            return Station.get(station)
        }
    }
}

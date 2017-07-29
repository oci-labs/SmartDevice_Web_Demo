package com.nexmatix.model

import com.nexmatix.Station

/**
 * Created by zak on 7/25/17.
 */
class ValveRecord implements ValveDetails {

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

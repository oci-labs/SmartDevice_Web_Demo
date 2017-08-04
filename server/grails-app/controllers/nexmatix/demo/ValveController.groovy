package nexmatix.demo

import com.nexmatix.Machine
import com.nexmatix.Station
import com.nexmatix.Valve
import grails.rest.*

class ValveController extends RestfulController<Valve> {
    static responseFormats = ['json']

    ValveController() {
        super(Valve)
    }

    def station(Integer stationNumber) {
        Station station = Station.findByNumber(stationNumber)
        if (station) {
            println "station: ${station}"
            Valve valve = Valve.findByStation(station)

            println "valve: ${valve}"
            [valve: valve]
        } else {
            render status: 404
        }

    }
}

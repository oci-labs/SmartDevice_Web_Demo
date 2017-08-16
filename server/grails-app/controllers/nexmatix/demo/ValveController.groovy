package nexmatix.demo

import com.nexmatix.Machine
import com.nexmatix.Manifold
import com.nexmatix.Station
import com.nexmatix.Valve
import grails.rest.*

class ValveController extends RestfulController<Valve> {
    static responseFormats = ['json']

    ValveController() {
        super(Valve)
    }

    def byStation(Integer station, Integer manifold) {

        Manifold m = Manifold.get(manifold)
        Station s = Station.findByNumberAndManifold(station, m)
        if (s && m) {
            Valve valve = Valve.findByStation(s)
            if(valve) {
                [valve: valve]
            } else {
                render status: 404
            }

        } else {
            render status: 404
        }

    }

    def bySerialNumber(Long serialNumber) {
        Valve v = Valve.findBySerialNumber(serialNumber)

        println Valve.list()

        if(v) {
            println v
            [valve: v]
        } else {
            render status: 404
        }
    }
}

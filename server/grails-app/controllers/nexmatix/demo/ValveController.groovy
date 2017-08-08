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

        println Valve.list()

        println "station: ${station}, manifold: ${manifold}"

        Manifold m = Manifold.get(manifold)
        println "manifold: ${m}"
        Station s = Station.findByNumberAndManifold(station, m)
        println "station: ${s}"
        if (s && m) {
            Valve valve = Valve.findByStation(s)
            println "valve ${valve}"

            if(valve) {
                [valve: valve]
            } else {
                render status: 404
            }

        } else {
            render status: 404
        }

    }
}

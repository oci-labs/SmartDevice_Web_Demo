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

    def station(Integer station, Integer manifold) {
        log.info "station: ${station}, manifold: ${manifold}"

        Manifold m = Manifold.get(manifold)
        Station s = Station.findByNumberAndManifold(station, m)

        if (s && m) {
            Valve valve = Valve.findByStation(s)

            [valve: valve]
        } else {
            render status: 404
        }

    }
}
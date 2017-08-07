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
        log.info "station: ${station}, manifold: ${manifold}"

        Manifold m = Manifold.get(manifold)
        log.info "manifold: ${m}"
        Station s = Station.findByNumberAndManifold(station, m)
        log.info "station: ${s}"

        if (s && m) {
            Valve valve = Valve.findByStation(s)

            [valve: valve]
        } else {
            render status: 404
        }

    }
}
package nexmatix.demo

import com.nexmatix.Manifold
import com.nexmatix.Station
import com.nexmatix.Valve
import com.nexmatix.ValveService
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import org.springframework.beans.factory.annotation.Autowired
@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class ValveController {
    static responseFormats = ['json']

    @Autowired
    ValveService valveService

    @Transactional(readOnly = true)
    def index(Integer max) {
        println "index.... "
        params.max = Math.min(max ?: 10, 100)
        respond Valve.withNewSession {
            valveService.list(params)
        }
    }

    @Transactional(readOnly = true)
    def show(Integer id) {
        respond Valve.withNewSession { Valve.get(id) }
    }

    @Transactional(readOnly = true)
    def byStation(Integer station, Integer manifold) {
        log.info "byStation ${station}/${manifold}"
        Manifold m = Manifold.get(manifold)
        Station s = Station.findByNumberAndManifold(station, m)
        if (s && m) {
            Valve valve = Valve.withNewSession {
                valveService.findByStationNumberAndManifoldSerialNumber(s.number, m.serialNumber)
            }
            if (valve) {
                [valve: valve]
            } else {
                log.warn "Missing valve for manifold ${m.serialNumber}, station ${s.number}"
                render status: 404
            }

        } else {
            log.warn "Missing ${s ? 'manifold ' + manifold : 'station ' + station}"
            render status: 404
        }

    }

}

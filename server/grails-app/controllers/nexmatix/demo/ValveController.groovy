package nexmatix.demo

import com.nexmatix.Manifold
import com.nexmatix.Station
import com.nexmatix.Valve
import com.nexmatix.ValveService
import grails.gorm.transactions.Transactional
import grails.rest.*
import org.springframework.beans.factory.annotation.Autowired

@Transactional("smartDeviceDataSource")
class ValveController extends RestfulController<Valve> {
    static responseFormats = ['json']

    @Autowired ValveService valveService

    ValveController() {
        super(Valve)
    }

    def byStation(Integer station, Integer manifold) {

        Manifold m = Manifold.get(manifold)
        Station s = Station.findByNumberAndManifold(station, m)
        if (s && m) {
            Valve valve = Valve.withSession { valveService.findByStationNumberAndManifoldSerialNumber(s.number, m.serialNumber)}
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

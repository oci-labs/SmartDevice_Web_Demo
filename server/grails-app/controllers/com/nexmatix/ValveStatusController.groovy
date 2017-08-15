package com.nexmatix


import grails.rest.*
import grails.converters.*

class ValveStatusController {
	static responseFormats = ['json', 'xml']

    def index() {
//        def valveStatus = new ValveStatus(valve: Valve.first())
//
//        valveStatus.name = "dsadasas"
//        valveStatus.updateTime = new Date()
//        valveStatus.cycleCount = 10000
//        valveStatus.cycleCountLimit = 111111
//        valveStatus.input = "sdadas"
//        valveStatus.leak = "adadsa"
//        valveStatus.pressureFault = "asdasd"
//        valveStatus.pressurePoint = 1312321.232
//
//        valveStatus.save(flush: true, failOnError: true)

        [statuses: ValveStatus.list()]
    }

    def byManifold(Long id) {
        Manifold m = Manifold.get(id)

        if(m) {
            def statuses = ValveStatus.executeQuery("""from ValveStatus where valve.id in 
                (select id from Valve where station.id in 
                (select id from Station where manifold = :manifold))""",
                    [manifold: Station.where { manifold == m}.get()])

            [statuses: statuses]

        } else {
            log.warn "Unable to find manifold with id: ${id}"
            render status: 404
        }
    }

    def show(Long id) {
        Valve valve = Valve.findBySerialNumber(id)
        if(valve) {
            [statusList: ValveStatus.findAllByValve(valve, [max: params.max ?: 10, sort: 'updateTime', order: 'desc'])]
        } else {
            log.warn "Unable to find valve with id: ${id}"
            render status: 404
        }

    }

}

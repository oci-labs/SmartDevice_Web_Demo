package com.nexmatix

import org.springframework.beans.factory.annotation.Autowired

class ValveAlertController {
	static responseFormats = ['json', 'xml']

    @Autowired ValveAlertService valveAlertService

    def show(Long id) {
        Valve valve = Valve.findBySerialNumber(id)
        if(valve) {
            [alertList: ValveAlert.withNewSession { valveAlertService.findAllByValve(valve, [max: params.max ?: 10, sort: 'detectionTime', order: 'desc']) }]
        } else {
            log.warn "Unable to find valve with id: ${id}"
            render status: 404
        }
    }

    def index() {
        [alertList: ValveAlert.withNewSession { valveAlertService.list([max: params.max ?: 10, sort: 'detectionTime', order: 'desc']) }]
    }

}

package com.nexmatix

import grails.gorm.transactions.Transactional
import org.springframework.beans.factory.annotation.Autowired

@Transactional(readOnly = true)
class ValveAlertController {
	static responseFormats = ['json', 'xml']

    @Autowired ValveAlertService valveAlertService

    def show(Long id) {
        Valve valve = Valve.findBySerialNumber(id)
        if(valve) {
            [alertViewData: ValveAlert.withNewSession { valveAlertService.findAllByValveForView(valve) }]
        } else {
            log.warn "Unable to find valve with id: ${id}"
            render status: 404
        }
    }

    def index() {
        [alertViewData: ValveAlert.withNewSession { valveAlertService.listForView() }]
    }

}

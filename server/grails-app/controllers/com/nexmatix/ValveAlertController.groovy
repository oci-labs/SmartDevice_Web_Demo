package com.nexmatix

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import org.springframework.beans.factory.annotation.Autowired

@Transactional(readOnly = true)
@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class ValveAlertController {
	static responseFormats = ['json', 'xml']

    @Autowired ValveAlertService valveAlertService
    @Autowired ValveService valveService

    def show(Integer id) {
        Valve valve = Valve.withNewSession { valveService.findBySerialNumber(id) }
        if(valve) {
            def alertViewData = ValveAlert.withNewSession { valveAlertService.findAllByValveForView(valve) }
            [alertViewData: alertViewData]
        } else {
            log.warn "Unable to find valve with id: ${id}"
            render status: 404
        }
    }

    def index() {
        [alertViewData: ValveAlert.withNewSession { valveAlertService.listForView() }]
    }

}

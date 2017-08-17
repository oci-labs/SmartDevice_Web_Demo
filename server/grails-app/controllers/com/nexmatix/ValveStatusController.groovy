package com.nexmatix

import grails.gorm.transactions.Transactional
import org.springframework.beans.factory.annotation.Autowired

@Transactional(readOnly = true)
class ValveStatusController {
    static responseFormats = ['json', 'xml']

    @Autowired ValveStatusService valveStatusService
    @Autowired ValveService valveService

    def index() {
        def statusViewData = ValveStatus.withNewSession { valveStatusService.listForView() }

        [statusViewData: statusViewData]
    }

    def byManifold(Integer serialNumber) {
        def statusViewData = ValveStatus.withNewSession { valveStatusService.findAllByManifoldSerialNumberForView(serialNumber) }

        [statusViewData: statusViewData]
    }

    def show(Integer id) {
        Valve valve = ValveStatus.withNewSession { valveService.findBySerialNumber(id) }
        if (valve) {
            [statusViewData: ValveStatus.withNewSession { valveStatusService.findAllByValveForView(valve) }]
        } else {
            log.warn "Unable to find valve with id: ${id}"
            render status: 404
        }

    }

}

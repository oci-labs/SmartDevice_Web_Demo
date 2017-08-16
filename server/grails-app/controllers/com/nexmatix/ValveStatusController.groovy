package com.nexmatix

import org.springframework.beans.factory.annotation.Autowired

class ValveStatusController {
    static responseFormats = ['json', 'xml']

    static datasource = 'smartDeviceDataSource'

    @Autowired ValveStatusService valveStatusService
    @Autowired ValveService valveService

    def index() {
        def statuses = ValveStatus.withNewSession { valveStatusService.list([max: params.max ?: 10, sort: 'updateTime', order: 'desc']) }
        [statuses: statuses]
    }

    def byManifold(Integer serialNumber) {
        def statuses = ValveStatus.withSession { valveStatusService.findAllByManifoldSerialNumber(serialNumber) }

        [statuses: statuses]
    }

    def show(Integer id) {
        Valve valve = valveService.findBySerialNumber(id)
        if (valve) {
            [statusList: ValveStatus.withSession { valveStatusService.findAllByValve(valve, [max: params.max ?: 10, sort: 'updateTime', order: 'desc']) }]
        } else {
            log.warn "Unable to find valve with id: ${id}"
            render status: 404
        }

    }

}

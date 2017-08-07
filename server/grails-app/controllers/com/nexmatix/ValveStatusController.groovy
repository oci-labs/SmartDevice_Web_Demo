package com.nexmatix


import grails.rest.*
import grails.converters.*

class ValveStatusController {
	static responseFormats = ['json', 'xml']
	
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

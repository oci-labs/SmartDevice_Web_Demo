package com.nexmatix


import grails.rest.*
import grails.converters.*

class ValveAlertController {
	static responseFormats = ['json', 'xml']

    def show(Long id) {
        Valve valve = Valve.findBySerialNumber(id)
        if(valve) {
            [alertList: ValveAlert.findAllByValve(valve, [max: params.max ?: 10, sort: 'detectionTime', order: 'desc'])]
        } else {
            log.warn "Unable to find valve with id: ${id}"
            render status: 404
        }
    }

    def index() {
        [alertList: ValveAlert.list(([max: params.max ?: 10, sort: 'detectionTime', order: 'desc']))]
    }

}

package com.nexmatix


import grails.rest.*
import grails.converters.*

class ValveAlertController {
	static responseFormats = ['json', 'xml']

    def show(Long id) {
        Valve valve = Valve.findBySerialNumber(id)
        [alertList: ValveAlert.findAllByValve(valve, [max: params.max ?: 10, sort: 'detectionTime', order: 'desc'])]

    }

    def index() {
        [alertList: ValveAlert.list(([max: params.max ?: 10, sort: 'detectionTime', order: 'desc']))]
    }

}

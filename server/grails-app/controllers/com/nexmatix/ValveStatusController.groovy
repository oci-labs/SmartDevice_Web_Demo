package com.nexmatix


import grails.rest.*
import grails.converters.*

class ValveStatusController {
	static responseFormats = ['json', 'xml']
	
    def show(Long id) {
        Valve valve = Valve.findBySerialNumber(id)
        [statusList: ValveStatus.findAllByValve(valve, [max: params.max ?: 10, sort: 'updateTime', order: 'desc'])]

    }

}

package com.nexmatix

import com.nexmatix.model.ValveAlertViewData
import grails.gorm.services.Query
import grails.gorm.services.Service

interface IValveAlertService {

    static datasource = 'smartDeviceConnection'

    @Query("from $ValveAlert as alert where alert.valveSerialNumber = ${valve.serialNumber}")
    List<ValveAlert> findAllByValve(Valve valve)
    List<ValveAlert> list(Map args)
}

@Service(ValveAlert)
abstract class ValveAlertService implements IValveAlertService {

    List<ValveAlertViewData> findAllByValveForView(Valve valve) {
        transformViewData(findAllByValve(valve))
    }

    List<ValveAlertViewData> listForView() {
        transformViewData(list())
    }

    private static transformViewData(List<ValveAlert> alerts) {
        List<ValveAlertViewData> viewData = []
        alerts.each { alert ->
            Valve valve = Valve.findBySerialNumber(alert.valveSerialNumber)
            if(valve) {
                viewData << new ValveAlertViewData(valveAlert: alert, valve: valve, stationId: valve.station.id)
            } else {
                log.warn "Missing valve ${alert.valveSerialNumber}"
            }
        }

        viewData
    }
}

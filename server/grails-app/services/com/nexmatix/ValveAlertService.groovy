package com.nexmatix

import com.nexmatix.model.ValveAlertViewData
import grails.gorm.services.Query
import grails.gorm.services.Service

interface IValveAlertService {

    static datasource = 'smartDeviceConnection'

    @Query("from $ValveAlert as alert where alert.valveSerialNumber = ${valve.serialNumber}")
    List<ValveAlert> findAllByValve(Valve valve, Map args)
    List<ValveAlert> list(Map args)
}

@Service(ValveAlert)
abstract class ValveAlertService implements IValveAlertService {

    List<ValveAlertViewData> findAllByValveForView(Valve valve) {
        transformViewData(findAllByValve(valve, null))
    }

    List<ValveAlertViewData> listForView() {
        transformViewData(list(null))
    }

    private static transformViewData(List<ValveAlert> alerts) {
        List<ValveAlertViewData> viewData = []
        alerts.each { alert ->
            Valve v = Valve.findBySerialNumber(alert.valveSerialNumber)
            viewData << new ValveAlertViewData(valveAlert: alert, valve: v, stationId: v.station.id)
        }

        viewData
    }
}

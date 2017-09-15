package com.nexmatix

import com.nexmatix.model.ValveAlertViewData
import grails.gorm.services.Query
import grails.gorm.services.Service

interface IValveAlertService {

    static datasource = 'smartDeviceConnection'

    @Query("from $ValveAlert as alert where alert.valveSerialNumber = ${valve.serialNumber}")
    List<ValveAlert> findAllByValve(Valve valve)
    List<ValveAlert> list(Map args)
    ValveAlert get(String alertType, Integer valveSerialNumber)
}

@Service(ValveAlert)
abstract class ValveAlertService implements IValveAlertService {

    List<ValveAlertViewData> findAllByValveForView(Valve valve) {
        transformViewData(findAllByValve(valve))
    }

    List<ValveAlertViewData> listForView() {
        transformViewData(list())
    }

    ValveAlert get(String alertType, Integer valveSerialNumber) {
        ValveAlert.get(new ValveAlert(alertType: alertType, valveSerialNumber: valveSerialNumber))
    }

    private static transformViewData(List<ValveAlert> alerts) {
        List<ValveAlertViewData> viewData = []
        alerts.each { alert ->
            Valve valve = Valve.findBySerialNumber(alert.valveSerialNumber)
            Station station = Station.get(valve.station.id)
            Manifold manifold = station.manifold
            Machine machine = manifold.machine
            Department department = machine.department
            Facility facility = department.facility
            if(valve) {
                viewData << new ValveAlertViewData(valveAlert: alert, valve: valve, stationId: station.number, manifoldId: manifold.serialNumber, machineId: machine.id, departmentId: department.id, facilityId: facility.id)
            } else {
                log.warn "Missing valve ${alert.valveSerialNumber}"
            }
        }

        viewData
    }
}

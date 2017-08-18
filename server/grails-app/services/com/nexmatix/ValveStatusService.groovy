package com.nexmatix

import com.nexmatix.model.ValveAlertViewData
import com.nexmatix.model.ValveStatusViewData
import grails.gorm.services.Join
import grails.gorm.services.Query
import grails.gorm.services.Service
import org.springframework.beans.factory.annotation.Autowired


interface IValveStatusService {

    static datasource = 'smartDeviceConnection'

    @Query("from $ValveStatus as status where status.valveSerialNumber = ${valve.serialNumber}")
    List<ValveStatus> findAllByValve(Valve valve)
    List<ValveStatus> findAllByManifoldSerialNumber(Integer manifoldSerialNumber)
    List<ValveStatus> list(Map args)
}

@Service(ValveStatus)
abstract class ValveStatusService implements IValveStatusService {

    List<ValveStatusViewData> listForView() {
        transformViewData(list(null))
    }

    List<ValveStatusViewData> findAllByValveForView(Valve valve) {
        transformViewData(findAllByValve(valve))
    }

    List<ValveStatusViewData> findAllByManifoldSerialNumberForView(Integer manifoldSerialNumber) {
        transformViewData(findAllByManifoldSerialNumber(manifoldSerialNumber))
    }

    private static transformViewData(List<ValveStatus> statuses) {
        List<ValveStatusViewData> viewData = []
        statuses.each { status ->
            Valve valve = Valve.findBySerialNumber(status.valveSerialNumber)
            if(valve) {
                viewData << new ValveStatusViewData(valveStatus: status, valve: valve, stationId: valve.station.id)
            }else {
                log.warn "Missing valve ${status.valveSerialNumber}"
            }
        }

        viewData
    }
}

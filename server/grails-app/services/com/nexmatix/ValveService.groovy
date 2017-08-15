package com.nexmatix

import com.nexmatix.datastore.ValveDataStoreService
import grails.gorm.transactions.Transactional

@Transactional
class ValveService {

    ValveDataStoreService valveDataStoreService

    Valve createNewValve(Long serialNumber) {
        log.info "createNewValve: ${serialNumber}"
        Valve valve = valveDataStoreService.retrieveEntity(serialNumber)

        if(valve && !valve.save()) {
            valve.errors.allErrors.each { log.error "${it}" }
            valve = null
        }

        return valve
    }

    Valve updateValve(Valve valve) {
        log.info "updateValve: ${valve.serialNumber}"
        Valve newValve = valveDataStoreService.retrieveEntity(valve.serialNumber)

        valve.station = newValve.station
        valve.fabricationDate = newValve.fabricationDate
        valve.shippingDate = newValve.shippingDate
        valve.sku = newValve.sku
        valve.updateTime = newValve.updateTime

        newValve.discard()

        if(valve && !valve.save()) {
            valve.errors.allErrors.each { log.error "${it}" }
            valve = null
        }

        return valve
    }
}

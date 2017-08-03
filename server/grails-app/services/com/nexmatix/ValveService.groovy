package com.nexmatix

import com.nexmatix.datastore.ValveDataStoreService
import grails.gorm.transactions.Transactional

@Transactional
class ValveService {

    ValveDataStoreService valveDataStoreService

    Valve createNewValve(Long serialNumber) {
        log.info "createNewValve: ${serialNumber}"
        Valve valve = new Valve(serialNumber: serialNumber, sku: 'whatevs', station: Station.first()) //valveDataStoreService.retrieveEntity(serialNumber)

        if(!valve.save()) {
            valve.errors.allErrors.each { log.error "${it}" }
            valve = null
        }

        return valve

    }
}

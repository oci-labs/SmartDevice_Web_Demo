package com.nexmatix

import com.nexmatix.datastore.ValveDataStoreService
import grails.gorm.transactions.Transactional

@Transactional
class ValveService {

    ValveDataStoreService dataStoreService

    Valve createNewValve(String serialNumber) {

        Valve valve = dataStoreService.retrieveEntity(serialNumber)

        if(!valve.save()) {
            valve.errors.allErrors.each { log.error "${it}" }
            valve = null
        }

        return valve

    }
}

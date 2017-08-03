package com.nexmatix

import com.nexmatix.datastore.ValveAlertDataStoreService
import grails.gorm.transactions.Transactional

@Transactional
class ValveAlertService {

    ValveAlertDataStoreService valveAlertDataStoreService

    def retrieveAndSend() {
        log.info "retrieveAndSend"

        def data = valveAlertDataStoreService.retrieveValveAlerts()

        log.info "retrieved ${data.size()} alerts..."
    }
}

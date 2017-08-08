package com.nexmatix

import com.nexmatix.datastore.ValveAlertDataStoreService
import grails.gorm.transactions.Transactional

@Transactional
class ValveAlertService {

    ValveAlertDataStoreService valveAlertDataStoreService

    def retrieveAndSend() {
        log.info "retrieveAndSend"

        def data = valveAlertDataStoreService.retrieveValveAlerts()

        deleteOldAlerts(data*.id)

        log.info "retrieved ${data.size()} alerts..."
    }

    void deleteOldAlerts(List<Long> activeAlertsIds) {
        log.warn "Deleting old alerts..."
        ValveAlert.executeUpdate("delete from ValveAlert where id not in :ids", [ids: activeAlertsIds])

    }
}

package com.nexmatix

import com.nexmatix.datastore.ValveStatusDataStoreService
import org.springframework.transaction.annotation.Transactional

@Transactional
class ValveStatusService {

    static datasource = 'smartDeviceDataSource'

    //ValveStatusDataStoreService valveStatusDataStoreService

    def retrieveAndSend() {
        log.info "retrieveAndSend"

        def data = [[id: '']] //valveStatusDataStoreService.retrieveValveStatuses()
        log.info "retrieved ${data.size()} statuses..."

        //deleteOldStatuses(data*.id)
    }

    void deleteOldStatuses(List<Long> activeStatusIds) {
        log.warn "Deleting old statuses..."
        ValveStatus.executeUpdate("delete from ValveStatus where id not in :ids", [ids: activeStatusIds])

    }
}

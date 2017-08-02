package com.nexmatix

import com.nexmatix.datastore.ValveStatusDataStoreService
import groovy.json.JsonBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.transaction.annotation.Transactional

@Transactional
class ValveStatusService {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate
    ValveStatusDataStoreService valveStatusDataStoreService

    def retrieveAndSend() {
        log.info "retrieveAndSend"

        def data = valveStatusDataStoreService.retrieveValveStatuses()

        log.info "data: ${data}"

        simpMessagingTemplate.convertAndSend "/topic/valves", "${new JsonBuilder(data*.outputProperties)}"

    }
}

package com.nexmatix

import com.nexmatix.datastore.ValveDataStoreService
import groovy.json.JsonBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.transaction.annotation.Transactional

@Transactional
class ValveDataService {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate
    ValveDataStoreService valveDataStoreService

    def retrieveAndSend() {
        log.info "retrieveAndSend"

        def data = valveDataStoreService.retrieveValveData()

        simpMessagingTemplate.convertAndSend "/topic/valves", "${new JsonBuilder(data*.outputProperties)}"

    }
}

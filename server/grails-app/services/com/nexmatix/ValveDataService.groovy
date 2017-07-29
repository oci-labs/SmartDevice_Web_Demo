package com.nexmatix

import groovy.json.JsonBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.transaction.annotation.Transactional

@Transactional
class ValveDataService {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate
    DataStoreService dataStoreService

    def retrieveAndSend() {
        log.info "retrieveAndSend"

        def data = dataStoreService.retrieveValveData()

        simpMessagingTemplate.convertAndSend "/topic/valves", "${new JsonBuilder(data*.outputProperties)}"

    }
}

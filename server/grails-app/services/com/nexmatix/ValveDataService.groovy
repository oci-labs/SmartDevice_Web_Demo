package com.nexmatix

import grails.transaction.Transactional
import groovy.json.JsonBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessagingTemplate

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

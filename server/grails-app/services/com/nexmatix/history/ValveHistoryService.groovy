package com.nexmatix.history

import com.nexmatix.Valve
import com.nexmatix.ValveStatus
import grails.events.annotation.Subscriber
import org.grails.datastore.mapping.engine.event.PostInsertEvent
import org.springframework.transaction.annotation.Transactional

@Transactional
class ValveHistoryService {

    @Subscriber
    void updateLastStatus(PostInsertEvent event) {
        if (event.entityObject instanceof ValveStatus) {
            log.info "updateLastStatus"
            ValveStatus status = event.entityObject as ValveStatus
            Valve valve = status.valve
            if(valve) {
                valve.latestStatus = status
                valve.save(flush: true)
            }
        }
    }
}

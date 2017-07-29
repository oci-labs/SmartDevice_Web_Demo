package com.nexmatix.history

import com.nexmatix.Valve
import com.nexmatix.ValveHistory
import grails.events.annotation.Subscriber
import org.grails.datastore.mapping.engine.event.PostUpdateEvent
import org.springframework.transaction.annotation.Transactional

@Transactional
class ValveHistoryService {

    @Subscriber
    void createHistory(PostUpdateEvent event) {
        if (event.entityObject instanceof Valve) {

            Valve valve = event.entityObject as Valve
            ValveHistory history = new ValveHistory(valve: valve, dateCreated: new Date())

            history.with {
                cycleCounts = valve.cycleCounts
                faults = valve.faults
                inputs = valve.inputs
                pressure = valve.pressure
            }

            history.save(flush: true)

        }
    }
}

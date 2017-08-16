package com.nexmatix

import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import static grails.async.Promises.*

@Slf4j
class ValveDataJob {

    @Autowired
    ValveStatusService valveStatusService

    @Autowired
    ValveAlertService valveAlertService

    @Scheduled(cron = "10 * * * * *")
    def retrieveAndSendData() {
        log.info "Retrieving data..."

        def updateStatuses = task {
            valveStatusService.retrieveAndSend()
        }

        def updateAlerts = task {
            valveAlertService.retrieveAndSend()
        }

        onComplete([updateStatuses,updateAlerts]) {
            log.info "completed updates."
        }

    }

}

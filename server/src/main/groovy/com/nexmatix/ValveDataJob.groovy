package com.nexmatix

import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled

@Slf4j
class ValveDataJob {

    @Autowired
    ValveStatusService valveStatusService

    @Autowired
    ValveAlertService valveAlertService

    @Scheduled(cron = "10 * * * * *")
    def retrieveAndSendData() {
        log.info "Retrieving data..."
        Valve.withNewSession {
            valveStatusService.retrieveAndSend()
            valveAlertService.retrieveAndSend()
        }

    }

}
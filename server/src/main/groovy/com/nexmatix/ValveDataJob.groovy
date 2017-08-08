package com.nexmatix

import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled

@Slf4j
class ValveDataJob {

    @Autowired
    ValveStatusService valveDataService

    @Autowired
    ValveAlertService valveAlertService

    @Scheduled(cron = "10 * * * * *")
    def retrieveAndSendData() {
        log.info "Retrieving data..."

        valveDataService.retrieveAndSend()
        valveAlertService.retrieveAndSend()

    }

}

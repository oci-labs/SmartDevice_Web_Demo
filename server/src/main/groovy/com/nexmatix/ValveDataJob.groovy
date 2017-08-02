package com.nexmatix

import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled

@Slf4j
class ValveDataJob {

    @Autowired
    ValveStatusService valveDataService

    @Scheduled(cron = "15 * * * * *")
    def retrieveAndSendData() {
        log.info "Retrieving data..."

        valveDataService.retrieveAndSend()
    }

}

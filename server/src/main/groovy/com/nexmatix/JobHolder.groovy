package com.nexmatix

import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled

@Slf4j
class JobHolder {

    @Autowired
    SnoozedAlertService snoozedAlertService


    @Scheduled(cron = "10 * * * * *")
    def updateSnoozedAlerts() {
        log.info "Updating snoozed alerts..."
        SnoozedAlert.withNewSession {
            snoozedAlertService.updateSnoozedAlerts()
        }

    }

}
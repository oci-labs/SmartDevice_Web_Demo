package com.nexmatix

import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
class AlertNotificationController {

    def send(Integer valveId) {
        log.info("Sending an alert for valveId: " + valveId)
        sendMail {
            from "nexmatix-mvd@objectcomputing.com"
            to "levinsona@objectcomputing.com"
            subject "Alert received for valve ${valveId}"
            text "An alert has been created for valveId: ${valveId}"
        }
    }


}

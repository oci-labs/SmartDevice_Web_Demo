package com.nexmatix

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

@Secured(['permitAll'])
class AlertNotificationController {

    def send(Integer valveId) {
        log.info("Sending an alert for valveId: " + valveId)
        sendMail {
            from "donotreply@test.com"
            to "aj.levinson@axceroglobal.com"
            subject "Alert received for valve ${valveId}"
            text "An alert has been created for valveId: ${valveId}"
        }
    }


}

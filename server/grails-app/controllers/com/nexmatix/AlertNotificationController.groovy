package com.nexmatix


import grails.rest.*
import grails.converters.*

class AlertNotificationController {

    def send(Integer valveId) {
        logger("Sending an alert for valveId: " + valveId)
        sendMail {
            from "donotreply@test.com"
            to "aj.levinson@axceroglobal.com"
            subject "Alert received for valve " + valveId
            text "An alert has been created for valveId: " valveId
        }
    }


}

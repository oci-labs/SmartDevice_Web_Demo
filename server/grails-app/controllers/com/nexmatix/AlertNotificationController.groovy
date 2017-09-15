package com.nexmatix

class AlertNotificationController {

    def mailService

    def send(Integer valveSN) {
        println "Sending an alert for Valve SN: " + valveSN
        try {
            mailService.sendMail {
                from "nexmatix-mvd@objectcomputing.com"
                to "levinsona@objectcomputing.com"
                subject "Alert received for Valve SN ${valveSN}"
                text "An alert has been created for Valve SN: ${valveSN}"
            }
            println "Sent email to levinsona@objectcomputing.com"

            render status: 200
        }
        catch (Exception e) {
            println "Exception encountered sending email for Valve SN: " + ${valveSN}, e
            render status: 500
        }
    }
}

package com.nexmatix

class AlertNotificationController {

    def mailService

    def send(Integer valveId) {
        println "Sending an alert for valveId: " + valveId
        try {
            mailService.sendMail {
                from "nexmatix-mvd@objectcomputing.com"
                to "levinsona@objectcomputing.com"
                subject "Alert received for valve ${valveId}"
                text "An alert has been created for valveId: ${valveId}"
            }
            println "Sent email to levinsona@objectcomputing.com"

            render status: 200
        }
        catch (Exception e) {
            println "Exception encountered sending email for valveId", e
            render status: 500
        }
    }
}

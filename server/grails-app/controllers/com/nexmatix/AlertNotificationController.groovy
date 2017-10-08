package com.nexmatix

class AlertNotificationController {

    def mailService

    def send(Integer valveSN) {
        println "Sending an alert for Valve SN: " + valveSN
        def users = User.list()
        try {
            users.each { user ->
                if (user.email) {
                    mailService.sendMail {
                        from "nexmatix-mvd@objectcomputing.com"
                        to user.email
                        subject "Alert received for Valve SN ${valveSN}"
                        text "An alert has been created for Valve SN: ${valveSN}"
                    }
                    println "Sent email to ${user.email}"
                }
            }
            render status: 200
        }
        catch (Exception e) {
            println "Exception encountered sending email for Valve SN: " + $ { valveSN }, e
            render status: 500
        }
    }
}

package com.nexmatix

class AlertNotificationController {

    def mailService

    def send(Integer stationNum) {
        println "Sending an alert for stationNum: " + stationNum
        try {
            mailService.sendMail {
                from "nexmatix-mvd@objectcomputing.com"
                to "levinsona@objectcomputing.com"
                subject "Alert received for station ${stationNum}"
                text "An alert has been created for stationNum: ${stationNum}"
            }
            println "Sent email to levinsona@objectcomputing.com"

            render status: 200
        }
        catch (Exception e) {
            println "Exception encountered sending email for stationNum", e
            render status: 500
        }
    }
}

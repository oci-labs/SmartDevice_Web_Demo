package com.nexmatix

import grails.plugins.mail.MailService
import grails.testing.web.controllers.ControllerUnitTest
import spock.lang.Specification

class AlertNotificationControllerSpec extends Specification implements ControllerUnitTest<AlertNotificationController> {

    void "Test the send action returns the appropriate response"() {

        given:
        controller.mailService = Mock(MailService)

        when: "The send action is executed"
        controller.send(1)

        then: "The response status should be 200"
        response.status == 200
    }
}
package com.nexmatix

import grails.testing.web.controllers.ControllerUnitTest
import spock.lang.Specification

/**
 * Created by ajlevinson on 9/28/17.
 */
class ValveAlertControllerSpec  extends Specification implements ControllerUnitTest<ValveAlertController> {

    void "Test the byUser action returns a Snoozed Alert list"() {

        given:
        controller.userService = Mock(SnoozedAlertService) {
            1 * findAllByUsername("testTommy") >> [new SnoozedAlert()]
        }

        when: "The byUserAction is executed"
        controller.byUser("testTommy")

        then: "The response status should be 200"
        response.status == 200
        response.json
    }

    void "Test the byUser action returns an empty list without errors"() {

        given:
        controller.userService = Mock(SnoozedAlertService) {
            1 * findAllByUsername("testTommy") >> []
        }

        when: "The byUserAction is executed"
        controller.byUser("testTommy")

        then: "The response status should be 200"
        response.status == 200
        response.json
    }
}

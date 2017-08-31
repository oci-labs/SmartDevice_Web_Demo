package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/snoozed')
class SnoozedAlert {

    User user
    ValveAlert valveAlert
    Date snoozedAt
    Long duration = 120000l

    static constraints = {
    }
}

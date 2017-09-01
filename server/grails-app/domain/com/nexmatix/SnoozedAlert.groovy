package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/snoozed')
class SnoozedAlert {

    User user
    Date snoozedAt
    Long duration = 120000l

    Map<String, Integer> valveAlertId
    private ValveAlert valveAlert

    ValveAlert getValveAlert() {
        if (!valveAlert && valveAlertId) {
            valveAlert = ValveAlert.get(compositeKey(valveAlertId))
        }
        valveAlert
    }

    void setValveAlert(ValveAlert v) {
        valveAlertId = [(v.alertType): v.valveSerialNumber]
    }

    static transients = ['valveAlert']

    static constraints = {
    }

    private static ValveAlert compositeKey(Map<String, Integer> key) {
        new ValveAlert(alertType: key.keySet()[0],
                valveSerialNumber: key.values()[0])
    }
}

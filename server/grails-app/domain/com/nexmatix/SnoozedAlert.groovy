package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/snoozed')
class SnoozedAlert {

    User user
    Date snoozedAt
    Long duration

    Map<String, Integer> valveAlertId

    static belongsTo = [user: User]

    private ValveAlert valveAlert

    ValveAlert getValveAlert() {
        if (!valveAlert && valveAlertId) {
            valveAlert = ValveAlert.get(compositeKey(valveAlertId))
        }
        valveAlert
    }

    void setValveAlert(ValveAlert v) {

        String typeString = v.alertType
        String typeVal =  AlertType.lookup(typeString)

        valveAlertId = [(typeVal): v.valveSerialNumber]

    }

    static transients = ['valveAlert']

    static constraints = {
    }

    private static ValveAlert compositeKey(Map<String, Integer> key) {
        new ValveAlert(alertType: key.keySet()[0],
                valveSerialNumber: key.values()[0])
    }
}

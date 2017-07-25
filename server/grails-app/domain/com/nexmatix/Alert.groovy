package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/alert', formats = ['json'], readOnly = false)
class Alert {

    Long valveSerial
    Date    thrownAt
    Boolean isActive
    com.nexmatix.AlertType alertType

    static belongsTo = [station: Station]

    static constraints = {
    }
}

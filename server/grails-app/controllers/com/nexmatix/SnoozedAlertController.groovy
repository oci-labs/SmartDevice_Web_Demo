package com.nexmatix

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import grails.web.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.*

@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class SnoozedAlertController extends RestfulController<SnoozedAlert> {
    static responseFormats = ['json']

    UserService userService
    ValveAlertService valveAlertService

    SnoozedAlertController() {
        super(SnoozedAlert)
    }

    @Override
    @Transactional
    def save() {
        User user = userService.get(params.userId)
        ValveAlert alert = valveAlertService.get(params.alertType, params.serialNumber)

        if (!user) {
            log.warn "Missing user ${params.userId}"
            render status: HttpStatus.NOT_FOUND
        } else if (!alert) {
            log.warn "Missing user ${params.alertId}"
            render status: HttpStatus.NOT_FOUND
        } else {
            def snoozedAlert = new SnoozedAlert(alert: alert, user: user, snoozedAt: new Date())

            if (!snoozedAlert.save()) {
                snoozedAlert.errors.allErrors.each { log.error "${it}" }
            }

            respond snoozedAlert
        }


    }


}
package com.nexmatix

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import grails.web.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.*

@Secured(['IS_AUTHENTICATED_ANONYMOUSLY'])
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

        ValveAlert alert = ValveAlert.withNewSession {
            valveAlertService.get(AlertType."${params.alertType}".id,
                    params.serialNumber.toInteger())
        }

        if (!user) {
            log.warn "Missing user ${params.userId}"
            render status: HttpStatus.NOT_FOUND
        } else if (!alert) {
            log.warn "Missing alert ${params.alertType} for ${params.serialNumber}"
            render status: HttpStatus.NOT_FOUND
        } else {
            def snoozedAlert = new SnoozedAlert(valveAlert: alert, user: user, snoozedAt: new Date())

            if (!snoozedAlert.save()) {
                snoozedAlert.errors.allErrors.each { log.error "${it}" }
            }

            respond snoozedAlert
        }


    }


}
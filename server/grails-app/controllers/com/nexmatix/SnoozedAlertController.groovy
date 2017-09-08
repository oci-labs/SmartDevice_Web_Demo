package com.nexmatix

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import grails.web.http.HttpHeaders
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.*

@Secured(['IS_AUTHENTICATED_ANONYMOUSLY'])
class SnoozedAlertController extends RestfulController<SnoozedAlert> {
    static responseFormats = ['json']

    @Autowired SnoozedAlertService snoozedAlertService

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

             [snoozedAlert: snoozedAlert]
        }


    }

    def byUsername(String username) {
        log.info "Snoozed alerts by username ${username}"
        def snoozedAlerts = snoozedAlertService.findAllByUsernameForView(username)
        println "snoozed alerts ${snoozedAlerts}"

        respond snoozedAlerts
    }


}
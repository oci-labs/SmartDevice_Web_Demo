package com.nexmatix

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import grails.web.http.HttpHeaders
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.*

@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class SnoozedAlertController {
    static responseFormats = ['json']

    @Autowired SnoozedAlertService snoozedAlertService

    @Autowired UserService userService
    @Autowired ValveAlertService valveAlertService

    @Transactional
    def save() {
        log.info "The params are ${params}"

        User user = userService.findByUsername(params.username)

        log.info "Found user: ${user}"

        ValveAlert alert = ValveAlert.withNewSession {
            valveAlertService.get(AlertType."${params.alertType}".id,
                    params.serialNumber.toInteger())
        }

        log.info "Found alert: ${alert}"

        if (!user) {
            log.warn "Missing user ${params.username}"
            render status: HttpStatus.NOT_FOUND
        } else if (!alert) {
            log.warn "Missing alert ${params.alertType} for ${params.serialNumber}"
            render status: HttpStatus.NOT_FOUND
        } else {
            log.info "Duration is: ${params.duration}"
            def snoozedAlert = new SnoozedAlert(valveAlert: alert, user: user, snoozedAt: new Date(), duration: params.duration)

            log.info "Preparing to save snoozed alert: ${snoozedAlert}"

            if (!snoozedAlert.save()) {
                snoozedAlert.errors.allErrors.each { log.error "${it}" }
            }

             [snoozedAlert: snoozedAlert]
        }


    }

    def byUser() {
        log.info "Snoozed alerts by username ${params.username}"
        def snoozedAlerts = snoozedAlertService.findAllByUsernameForView(params.username)
        log.info "snoozed alerts ${snoozedAlerts}"

        [snoozedAlerts: snoozedAlerts]
    }


}
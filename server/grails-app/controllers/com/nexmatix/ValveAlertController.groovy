package com.nexmatix

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus

@Transactional
@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class ValveAlertController {
	static responseFormats = ['json', 'xml']

    @Autowired ValveAlertService valveAlertService
    @Autowired ValveService valveService
    @Autowired SnoozedAlertService snoozedAlertService
    @Autowired UserService userService

    def show(Integer id) {
        Valve valve = Valve.withNewSession { valveService.findBySerialNumber(id) }
        if(valve) {
            def alertViewData = ValveAlert.withNewSession { valveAlertService.findAllByValveForView(valve) }
            [alertViewData: alertViewData]
        } else {
            log.warn "Unable to find valve with id: ${id}"
            render status: 404
        }
    }

    def index() {
        [alertViewData: ValveAlert.withNewSession { valveAlertService.listForView() }]
    }

    def byUser(String username) {
        log.info "Snoozed alerts by username ${username}"
        def snoozedAlerts = snoozedAlertService.findAllByUsernameForView(username)
        log.info "snoozed alerts ${snoozedAlerts}"

        [snoozedAlerts: snoozedAlerts]
    }

    @Transactional
    def snooze() {
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

            log.info "Snoozed alert is ${snoozedAlert}"

            [snoozedAlert: snoozedAlert]
        }
    }

    @Transactional
    def unsnoozeByUser() {
        log.info "The params are ${params}"
        def snoozedAlerts = snoozedAlertService.findAllByUsernameForView(params.username)
        try {
            snoozedAlerts.each { snoozedAlert ->
                if (new Date().time - snoozedAlert.snoozedAt.time > snoozedAlert.duration) {
                    log.info "Deleting expired snoozed alert ${snoozedAlert}"
                    snoozedAlert.delete(flush: true)
                }
            }

            render status: 200
        } catch (Exception e) {
            log.error "Exception encountered unsnoozing alerts ${e}"
            render status: 500
        }
    }

}

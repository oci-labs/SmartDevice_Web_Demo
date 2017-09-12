package com.nexmatix

import grails.gorm.transactions.Transactional

@Transactional
class SnoozedAlertService {

    UserService userService

    def findAllByUsernameForView(String username) {
        def usernameQuery = User.where {
            username == username
        }
        User foundUser = usernameQuery.get()

        def snoozedAlertsQuery = SnoozedAlert.where {
            user.id == foundUser.id
        }
        List<SnoozedAlert> foundAlerts = snoozedAlertsQuery.list()

        foundAlerts
    }

    void updateSnoozedAlerts() {

        List<User> users = userService.list()

        users.each { user ->

            List<SnoozedAlert> alerts = snoozedAlert.findAllByUser(user)
            alerts.each { alert ->
                if(new Date().time - alert.snoozedAt.time > alert.duration) {
                    log.warn "Deleting snoozed alert..."
                    alert.delete(flush: true)
                }
            }

        }


    }

}

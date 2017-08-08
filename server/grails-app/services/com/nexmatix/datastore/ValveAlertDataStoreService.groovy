package com.nexmatix.datastore

import com.google.cloud.datastore.Entity
import com.nexmatix.AlertType
import com.nexmatix.Valve
import com.nexmatix.ValveAlert
import com.nexmatix.ValveService
import org.springframework.transaction.annotation.Transactional

import javax.annotation.PostConstruct
import java.time.Instant

@Transactional
class ValveAlertDataStoreService implements DataStoreService<ValveAlert> {

    //TODO: ValveService valveService

    List<ValveAlert> retrieveValveAlerts() {
        log.info "retrieveValveAlerts..."
        listEntities(1000, 0)
    }


    @Override
    ValveAlert transformEntity(Entity entity) {
        log.debug "transformEntity: ${entity.key.name}"
        ValveAlert.withNewTransaction {

            ValveAlert alert = ValveAlert.findByName("${entity.key.name}")

            if(!alert) {
                Valve valve = Valve.findBySerialNumber(entity.getLong('valve_sn'))

                //TODO: if(!valve) valve = valveService.createNewValve(entity.getLong('valve_sn'))

                if(valve) {
                    alert = new ValveAlert(
                            name: "${entity.key.name}",
                            valve: valve)
                } else {
                    log.warn "Missing valve!"
                    return null
                }
            } else {
                log.info "Updating alert for ${alert.valve.serialNumber}"
            }

            alert.description = entity.getString('description')
            alert.alertType = AlertType.lookup(entity.getString('alert_type'))
            alert.detectionTime = new Date(entity.getLong('detection_time'))

            if(!alert.save()) alert.errors.allErrors.each { log.error "${it}"}

            return alert
        }
    }

    @PostConstruct
    void init() {
        kind = "ValveAlert"
        keyFactory = datastore.newKeyFactory().setKind(kind)
    }
}
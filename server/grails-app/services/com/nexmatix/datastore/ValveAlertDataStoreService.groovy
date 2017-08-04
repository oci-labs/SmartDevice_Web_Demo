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

    ValveService valveService

    List<ValveAlert> retrieveValveAlerts() {
        log.info "retrieveValveAlerts..."
        listEntities(1000, 0)
    }


    @Override
    ValveAlert transformEntity(Entity entity) {
        log.debug "transformEntity: ${entity.key.id}"
        ValveAlert.withNewTransaction {
            if(!ValveAlert.findByName("${entity.key.id}")) {
                Valve valve = Valve.findBySerialNumber(entity.getLong('valve_sn'))

                //TODO: if(!valve) valve = valveService.createNewValve(entity.getLong('valve_sn'))

                if(valve) {
                    ValveAlert alert = new ValveAlert(
                            name: "${entity.key.id}",
                            valve: valve,
                            description: entity.getString('description'),
                            alertType: AlertType.lookup(entity.getString('alert_type')),
                            detectionTime: new Date(entity.getLong('detection_time')))

                    if(!alert.save())
                        alert.errors.allErrors.each { log.error "${it}" }

                    alert
                } else {
                    log.warn "Missing valve!"
                }
            }
        }
    }

    @PostConstruct
    void init() {
        kind = "ValveAlert"
        keyFactory = datastore.newKeyFactory().setKind(kind)
    }
}
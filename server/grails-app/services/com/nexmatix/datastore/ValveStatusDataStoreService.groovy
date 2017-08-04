package com.nexmatix.datastore

import com.google.cloud.datastore.Entity
import com.google.cloud.datastore.QueryResults
import com.nexmatix.Valve
import com.nexmatix.ValveService
import com.nexmatix.ValveStatus
import grails.gorm.transactions.TransactionService
import org.springframework.transaction.annotation.Transactional

import javax.annotation.PostConstruct
import java.time.Instant

@Transactional
class ValveStatusDataStoreService implements DataStoreService<ValveStatus> {

    ValveService valveService

    List<ValveStatus> retrieveValveStatuses() {
        log.info "retrieveValveStatuses..."

        return listEntities(1000, 0)
    }


    @Override
    ValveStatus transformEntity(Entity entity) {
        log.debug "transformEntity: ${entity.key.name}"
        Valve.withNewTransaction {

            Valve valve = Valve.findBySerialNumber(entity.getLong('valve_sn'))

            if(!valve) valve = valveService.createNewValve(entity.getLong('valve_sn'))
            if(!ValveStatus.findByName(entity.key.name)) {
                ValveStatus status = new ValveStatus(
                        name: entity.key.name,
                        valve: valve,
                        cycleCount: entity.getLong('cc'),
                        cycleCountLimit: entity.getLong('ccl'),
                        input: entity.getString('input'),
                        leak: entity.getString('leak'),
                        pressureFault: entity.getString('p_fault'),
                        pressurePoint: entity.getLong('pp'),
                        updateTime: Date.from(Instant.parse(entity.getString('update_time'))))

                if(!status.save())
                    status.errors.allErrors.each { log.error "${it}" }

                status
            }
        }
    }

    @PostConstruct
    void init() {
        kind = "ValveStatus"
        keyFactory = datastore.newKeyFactory().setKind(kind)
    }
}
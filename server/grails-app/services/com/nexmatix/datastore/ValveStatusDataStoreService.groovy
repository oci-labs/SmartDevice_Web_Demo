package com.nexmatix.datastore

import com.google.cloud.datastore.Entity
import com.google.cloud.datastore.QueryResults
import com.nexmatix.ManifoldService
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
    ManifoldService manifoldService

    List<ValveStatus> retrieveValveStatuses() {
        log.info "retrieveValveStatuses..."

        return listEntities(1000, 0)
    }


    @Override
    ValveStatus transformEntity(Entity entity) {
        log.debug "transformEntity: ${entity.key.name}"
        Valve.withNewTransaction {

            ValveStatus status = ValveStatus.findByName(entity.key.name)
            Valve valve = null
            if (!status) {
                log.warn "New status for valve: ${entity.getLong('valve_sn')}"
                status = new ValveStatus(name: entity.key.name)
                valve = Valve.findBySerialNumber(entity.getLong('valve_sn'))
                if (!valve) valve = valveService.createNewValve(entity.getLong('valve_sn'))
            }

            status.name = entity.key.name
            if(valve) status.valve = valveService.updateValve(valve)
            status.cycleCount = entity.getLong('cc')
            status.cycleCountLimit = entity.getLong('ccl')
            status.input = entity.getString('input')
            status.leak = entity.getString('leak')
            status.pressureFault = entity.getString('p_fault')
            status.pressurePoint = entity.getLong('pp')
            status.updateTime = new Date(entity.getLong('update_time'))

            manifoldService.updateManifold(entity.getLong('manifold_sn'), entity.getLong('station_num'))

            if (!status.save())
                status.errors.allErrors.each { log.error "${it}" }

            status

        }
    }

    @PostConstruct
    void init() {
        kind = "ValveStatus"
        keyFactory = datastore.newKeyFactory().setKind(kind)
    }
}
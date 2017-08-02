package com.nexmatix.datastore

import com.google.cloud.datastore.Entity
import com.google.cloud.datastore.QueryResults
import com.nexmatix.Valve
import com.nexmatix.ValveService
import com.nexmatix.ValveStatus
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Transactional
class ValveStatusDataStoreService implements DataStoreService<ValveStatus> {

    ValveService valveService

    List<ValveStatus> retrieveValveStatuses() {
        log.info "retrieveValveStatuses..."

        return listEntities(1000, 0)
    }

    @Override
    List<ValveStatus> transformEntities(QueryResults<Entity> results) {
        log.info "transformEntities: ${results}"

        ValveStatus.withNewTransaction {
            List<ValveStatus> records = []
            results.each { result ->

                Valve valve = Valve.findBySerialNumber(result.getString('valve_sn'))

                if(valve) valve = valveService.createNewValve(result.getString('valve_sn'))

                ValveStatus status = new ValveStatus(
                        valve: valve,
                        cycleCount: result.getLong('cc'),
                        cycleCountLimit: result.getLong('ccl'),
                        input: result.getString('input'),
                        leak: result.getString('leak'),
                        pressureFault: result.getString('p_fault'),
                        pressurePoint: result.getLong('pp'),
                        updateTime: Date.from(Instant.parse(result.getString('update_time'))))

                if(!status.save())
                    status.errors.allErrors.each { log.error "${it}" }

                records << status
            }
            return records
        }
    }


    @Override
    ValveStatus transformEntity(Entity entity) {

    }
}
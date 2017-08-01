package com.nexmatix.datastore

import com.google.cloud.datastore.Entity
import com.google.cloud.datastore.QueryResults
import com.nexmatix.model.ValveRecord
import org.springframework.transaction.annotation.Transactional

@Transactional
class ValveDataStoreService implements DataStoreService {

    ValveDataStoreService() {
        kind = 'ValveStatus'
    }

    List<ValveRecord> retrieveValveData() {
        log.info "retrieveValveData..."

        return listEntities(1000, 0) as List<ValveRecord>
    }

    @Override
    def transformEntities(QueryResults<Entity> results) {

        List<ValveRecord> records = []
        results.each { result ->
            records << new ValveRecord(
                    result.getLong('cc'),
                    result.getLong('faults'),
                    result.getLong('inputs'),
                    result.getLong('pressure'),
                    result.getLong('valve_station'))
        }

        return records
    }
}
package com.nexmatix

import com.nexmatix.mock.ValveResponseMock
import com.nexmatix.model.ValveRecord
import groovy.json.JsonSlurper
import org.springframework.transaction.annotation.Transactional

@Transactional
class DataStoreService {

    List<ValveRecord> retrieveValveData() {
        log.info "retrieveValveData..."

        def response = ValveResponseMock.response

        def parsed = new JsonSlurper().parseText(response)
        List<ValveRecord> records = []
        parsed['summary'].each { record ->

            records << new ValveRecord(
                    record['cycle_count'],
                    record['faults'],
                    record['inputs'],
                    record['pressure'],
                    record['station'])
        }

        return records

    }

}
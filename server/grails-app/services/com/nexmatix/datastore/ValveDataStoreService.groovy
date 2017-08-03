package com.nexmatix.datastore

import com.google.cloud.datastore.Entity
import com.nexmatix.Valve
import grails.gorm.transactions.Transactional

import javax.annotation.PostConstruct

@Transactional
class ValveDataStoreService implements DataStoreService<Valve> {

    @Override
    Valve transformEntity(Entity entity) {
        println "transformEntity..."
        log.info "transformEntity: ${entity.key}"
        return new Valve(
                serialNumber: entity.key.toString().toLong(),
                sku: entity.getString('sku')
        )
    }

    @PostConstruct
    void init() {
        kind = "Valve"
        keyFactory = datastore.newKeyFactory().setKind(kind)
    }
}

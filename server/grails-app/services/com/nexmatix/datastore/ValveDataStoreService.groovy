package com.nexmatix.datastore

import com.google.cloud.datastore.Entity
import com.google.cloud.datastore.QueryResults
import com.nexmatix.Valve
import grails.gorm.transactions.Transactional
import sun.reflect.generics.reflectiveObjects.NotImplementedException

@Transactional
class ValveDataStoreService implements DataStoreService<Valve> {

    @Override
    List transformEntities(QueryResults<Entity> results) {
        log.info "transformEntities: ${results}"
        throw new NotImplementedException()
    }

    @Override
    Valve transformEntity(Entity entity) {
        return new Valve(
                serialNumber: entity.key,
                sku: entity.getString('sku')
        )
    }
}

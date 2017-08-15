package com.nexmatix.datastore

import com.google.cloud.datastore.Entity
import com.nexmatix.Manifold
import com.nexmatix.Station
import com.nexmatix.StationService
import com.nexmatix.Valve
import grails.gorm.transactions.Transactional

import javax.annotation.PostConstruct

@Transactional
class ValveDataStoreService implements DataStoreService<Valve> {

    StationService stationService

    @Override
    Valve transformEntity(Entity entity) {

        if (entity) {
            log.info "transformEntity: ${entity.key.name}"


            Station station = Station.findByNumberAndManifold(entity.getLong('station_num') as Integer, Manifold.first())
            if (!station) station = stationService.createStation(entity.getLong('station_num') as Integer, Manifold.first())

            return new Valve(
                    serialNumber: entity.key.name.toLong(),
                    fabricationDate: entity.getLong('fab_date'),
                    shippingDate: entity.getLong('ship_date'),
                    sku: entity.getString('sku'),
                    updateTime: entity.getLong('update_time'),
                    station: station
            )
        } else {
            log.warn "No entity!"
        }
    }

    @PostConstruct
    void init() {
        kind = "Valve"
        keyFactory = datastore.newKeyFactory().setKind(kind)
    }
}

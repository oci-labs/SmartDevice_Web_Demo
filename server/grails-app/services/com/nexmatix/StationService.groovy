package com.nexmatix

import grails.gorm.transactions.Transactional

@Transactional
class StationService {

    Station createStation(Integer number, Manifold manifold) {
        log.info "creationStation ${number} on Manifold: ${manifold.serialNumber}"
        Station station = new Station(number: number, manifold: manifold).save()
        return station
    }
}

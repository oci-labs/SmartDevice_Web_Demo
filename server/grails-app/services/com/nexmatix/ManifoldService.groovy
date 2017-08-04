package com.nexmatix

import grails.gorm.transactions.Transactional

@Transactional
class ManifoldService {

    StationService stationService

    def updateManifold(Long serialNumber, Long stationNumber) {
        Manifold manifold = Manifold.findBySerialNumber(serialNumber)
        if(!manifold) {
            log.warn "Creating new manifold ${serialNumber}..."
            manifold = new Manifold(serialNumber: serialNumber, machine: Machine.first())
        }

        Station station = Station.findByNumberAndManifold(stationNumber.toInteger(), manifold)
        if(!station) {
            log.warn "Creating new station: ${stationNumber}..."
            station = stationService.createStation(stationNumber.toInteger(), manifold)
        }
        manifold.addToStations(station)
        manifold.save()
    }
}

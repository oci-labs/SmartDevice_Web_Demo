package com.nexmatix

import grails.gorm.transactions.Transactional

@Transactional
class StationService {

    Station createStation(Integer number) {
        Station station = new Station(number: number, serialNumber: UUID.toString()).save(flush: true)
        return station
    }
}

package com.nexmatix

import com.nexmatix.datastore.ValveDataStoreService
import grails.gorm.services.Service
import grails.gorm.transactions.Transactional

@Service(Valve)
interface ValveService {

    static datasource = 'smartDeviceDataSource'

    Valve findByStationNumberAndManifoldSerialNumber(Integer stationNumber, Integer manifoldSerialNumber)

    Valve findBySerialNumber(Integer serialNumber)
}

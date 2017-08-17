package com.nexmatix

import grails.gorm.services.Service

@Service(Valve)
interface ValveService {

    static datasource = 'smartDeviceConnection'

    Valve findByStationNumberAndManifoldSerialNumber(Integer stationNumber, Integer manifoldSerialNumber)

    Valve findBySerialNumber(Integer serialNumber)
}

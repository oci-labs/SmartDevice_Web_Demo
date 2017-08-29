package com.nexmatix

import grails.gorm.services.Service

@Service(Valve)
interface ValveService {

    static datasource = 'smartDeviceConnection'

    List<Valve> list(Map args)

    Valve findByStationNumberAndManifoldSerialNumber(Integer stationNumber, Integer manifoldSerialNumber)

    Valve findBySerialNumber(Integer serialNumber)
}

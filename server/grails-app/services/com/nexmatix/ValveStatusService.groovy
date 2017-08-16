package com.nexmatix

import grails.gorm.services.Service

@Service(ValveStatus)
interface ValveStatusService {

    static datasource = 'smartDeviceDataSource'

    List<ValveStatus> list(Map args)

    List<ValveStatus> findAllByValve(Valve valve, Map args)

    List<ValveStatus> findAllByManifoldSerialNumber(Integer manifoldSerialNumber)
}

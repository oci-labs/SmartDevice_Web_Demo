package com.nexmatix

import com.nexmatix.datastore.ValveAlertDataStoreService
import grails.gorm.services.Service
import grails.gorm.transactions.Transactional

@Service(ValveAlert)
interface ValveAlertService {

    static datasource = 'smartDeviceDataSource'

    List<ValveAlert> findAllByValve(Valve valve, Map args)

    List<ValveAlert> list(Map args)
}

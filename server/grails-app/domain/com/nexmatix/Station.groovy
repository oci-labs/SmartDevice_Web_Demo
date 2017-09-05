package com.nexmatix

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@Resource(uri='/api/station', formats = ['json'], readOnly = false)
@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class Station {

    Integer number

    static belongsTo = [manifold: Manifold]
    static hasMany = [alerts: Alert]

    static constraints = {
        alerts nullable: true
    }

    Valve getValve() {
        return Valve.withNewSession { Valve.findByManifoldSerialNumberAndStationNumber(this.manifold.serialNumber, this.number) }
    }

}

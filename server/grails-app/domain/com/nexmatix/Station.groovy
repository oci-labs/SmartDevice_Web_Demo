package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/station', formats = ['json'], readOnly = false)
class Station {

    Integer number

    static belongsTo = [manifold: Manifold]
    static hasMany = [alerts: Alert]


    Valve getValve() {
        return Valve.findByStation(this)
    }

  //  static hasMany = [valves: Valve] ? do we have valves or does valve data go in station

}

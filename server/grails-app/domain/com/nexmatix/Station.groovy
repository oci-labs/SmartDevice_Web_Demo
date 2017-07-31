package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/station', formats = ['json'], readOnly = false)
class Station {

    String name

    static belongsTo = [manifold: Manifold]
    static hasMany = [alerts: Alert]
  //  static hasMany = [valves: Valve] ? do we have valves or does valve data go in station

}

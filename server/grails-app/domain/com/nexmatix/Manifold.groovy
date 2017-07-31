package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/manifold', formats = ['json'], readOnly = false)
class Manifold {

    String name

    static belongsTo = [machine: Machine]
    static hasMany = [stations: Station]

    static constraints = {
        stations nullable: true
    }
}

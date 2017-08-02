package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/manifold', formats = ['json'], readOnly = false)
class Manifold {

    String name
    Machine machine

    static hasMany = [stations: Station]

    static constraints = {
        stations nullable: true
    }
}

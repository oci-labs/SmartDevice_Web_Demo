package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/machine', formats = ['json'], readOnly = false)
class Machine {

    String name

    static belongsTo = [department: Department]
    static hasMany = [manifolds: Manifold]

    static constraints = {
        manifolds nullable: true
    }
}

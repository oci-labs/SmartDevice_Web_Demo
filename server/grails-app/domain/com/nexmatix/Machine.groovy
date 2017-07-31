package com.nexmatix

import grails.rest.Resource

class Machine {

    String name

    static belongsTo = [department: Department]
    static hasMany = [manifolds: Manifold]

    static constraints = {
        manifolds nullable: true
    }
}

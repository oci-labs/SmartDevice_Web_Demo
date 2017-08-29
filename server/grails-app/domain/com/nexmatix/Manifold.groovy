package com.nexmatix

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@Resource(uri='/api/manifold', formats = ['json'], readOnly = false)
@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class Manifold {

    Integer serialNumber
    Machine machine

    static hasMany = [stations: Station]

    static constraints = {
        stations nullable: true
    }
}

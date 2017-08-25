package com.nexmatix

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@Resource(uri='/api/facility', formats = ['json'])
@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class Facility {

    String name

    static hasMany = [ departments: Department ]

    static constraints = {
        departments nullable: true
    }
}

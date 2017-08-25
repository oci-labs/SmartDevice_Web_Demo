package com.nexmatix

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@Resource(uri='/api/department', formats = ['json'], readOnly = false)
@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class Department {

    String name

    static belongsTo = [facility: Facility]
    static hasMany = [ machines: Machine ]

    static constraints = {
        machines nullable: true
    }

}

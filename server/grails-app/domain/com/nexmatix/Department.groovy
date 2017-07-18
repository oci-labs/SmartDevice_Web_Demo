package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/department', formats = ['json'], readOnly = false)
class Department {

    String name

    static belongsTo = [facility: Facility]
    static hasMany = [ machines: Machine ]

    static constraints = {
        machines nullable: true
    }

}

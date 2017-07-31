package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/facility', formats = ['json'], readOnly = false)
class Facility {

    String name

    static hasMany = [ departments: Department ]

    static constraints = {
        departments nullable: true
    }
}

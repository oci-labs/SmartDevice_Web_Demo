package com.nextmatix

import grails.rest.Resource

@Resource(uri='/api/department', formats = ['json'], readOnly = false)
class Department {

    String name

    static belongsTo = [facility: Facility]

}

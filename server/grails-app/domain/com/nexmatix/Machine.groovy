package com.nexmatix

import grails.rest.Resource

class Machine {

    String name
    Department department

    static constraints = {
        manifolds nullable: true
    }
}

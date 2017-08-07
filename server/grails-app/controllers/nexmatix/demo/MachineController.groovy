package com.nexmatix

import grails.rest.RestfulController

class MachineController extends RestfulController<Machine> {
    static responseFormats = ['json']
    MachineController() {
        super(Machine)
    }

    def byDepartment(Long departmentId) {
        Department d = Department.get(departmentId)
        println "department ${d}"
        if(d) {
            [machines: Machine.where{department == d}.list()]
        }
        else render status: 404
    }
}
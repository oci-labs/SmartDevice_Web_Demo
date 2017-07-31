package com.nexmatix

import grails.rest.RestfulController

class MachineController extends RestfulController<Machine> {
    static responseFormats = ['json']
    MachineController() {
        super(Machine)
    }

    def machinesForDepartment(Long departmentId) {
        println "DepartmentId"
        Department d = Department.get(departmentId)
        if(d) [machines: Machine.where{department == d}.list()]
        else render status: 404
    }
}
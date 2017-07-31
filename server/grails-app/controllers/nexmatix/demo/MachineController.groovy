package com.nexmatix

import grails.rest.RestfulController

class MachineController extends RestfulController<Machine> {
    static responseFormats = ['json']
    MachineController() {
        super(Machine)
    }

    def byDepartment(Long id) {
        Department d = Department.get(id)
        if(d) {
            [machines: Machine.where{department == d}.list()]
        }
        else render status: 404
    }
}
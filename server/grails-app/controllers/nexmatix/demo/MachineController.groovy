package nexmatix.demo

import com.nexmatix.Machine
import com.nexmatix.Department
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class MachineController extends RestfulController<Machine> {
    static responseFormats = ['json']
    MachineController() {
        super(Machine)
    }

    def byDepartment(Long departmentId) {
        Department d = Department.get(departmentId)
        if(d) {
            [machines: Machine.where{department == d}.list()]
        }
        else render status: 404
    }
}
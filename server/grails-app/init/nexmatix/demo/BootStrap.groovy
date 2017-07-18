package nexmatix.demo

import com.nexmatix.Department
import com.nexmatix.Facility
import com.nexmatix.Machine
import com.nexmatix.Manifold
import com.nexmatix.Station


class BootStrap {

    def init = { servletContext ->
        println "Loading database..."
        ["Facility A", "Facility B", "Facility C"].each { name ->

            def facility = new Facility(name: name).save()
            println "Saved facility: ${facility.name}"

        }

        ["Department 1", "Department 2", "Department 3"].each { name ->

            def department = new Department([name: name, facility: 1]).save()
            println "Saved department: ${department.name}"
        }

        ["Machine A", "Machine B", "Machine C"].each { name ->

            def machine = new Machine(name: name, department: 1).save()
            println "Saved machine: ${machine.name}"
        }

        ["Manifold 1", "Manifold 2", "Manifold 3"].each { name ->

            def manifold = new Manifold(name: name, machine: 1).save()
            println "Saved manifold: ${manifold.name}"
        }

        ["Station A", "Station B", "Station C"].each { name ->

            def station = new Station(name: name, manifold: 1).save()
            println "Saved station: ${station.name}"
        }

    }
    def destroy = {
    }
}

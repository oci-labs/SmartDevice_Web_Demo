package nexmatix.demo

import com.nexmatix.Department
import com.nexmatix.Facility
import com.nexmatix.Machine
import com.nexmatix.Manifold
import com.nexmatix.Station

import java.lang.reflect.Array


class BootStrap {

    def toLetter = { number ->
        def thirdLetter = number % 26
        def secondLetter = (number - thirdLetter) / 26
        def firstLetter = (number - thirdLetter - (secondLetter * 26)) / 26
        return String.valueOf((char)(firstLetter + 65)) + String.valueOf((char)(secondLetter + 65)) + String.valueOf((char)(thirdLetter + 65))
    }

    def init = { servletContext ->
        println "Loading database..."
        ["Facility A", "Facility B", "Facility C"].each { name ->

            def facility = new Facility(name: name).save()
            println "Saved facility: ${facility.name}"

        }

        (new Array[9]).eachWithIndex { name, i ->

            def department = new Department([name: "Department " + (i+1), facility: (i % 3) + 1]).save()
            println "Saved department: ${department.name} belongs to ${department.facility.name}"
        }

        (new Array[27]).eachWithIndex { name, i ->

            def machine = new Machine(name: "Machine " + toLetter(i), department: (i%9)+1).save()
            println "Saved _machine: ${machine.name}"
        }

        (new Array[108]).eachWithIndex { name, i ->

            def manifold = new Manifold(name: "Manifold " + (i+1), machine: (i%27)+1).save()
            println "Saved manifold: ${manifold.name}"
        }

        (new Array[648]).eachWithIndex { name, i ->

            def station = new Station(name: "Station " + toLetter(i), manifold: (i%108)+1).save()
            println "Saved station: ${station.name}"
        }

    }
    def destroy = {
    }
}

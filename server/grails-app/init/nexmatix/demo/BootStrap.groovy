package nexmatix.demo

import com.nextmatix.Facility

class BootStrap {

    def init = { servletContext ->
        println "Loading database..."
        ["Facility A", "Facility B", "Facility C"].each { name ->

            def facility = new Facility(name: name).save()
            println "Saved facility: ${facility.name}"

        }

    }
    def destroy = {
    }
}

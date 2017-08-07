package nexmatix.demo

import com.nexmatix.Alert
import com.nexmatix.AlertType
import com.nexmatix.Department
import com.nexmatix.Facility
import com.nexmatix.Machine
import com.nexmatix.Manifold
import com.nexmatix.Station
import com.nexmatix.Valve

import java.sql.Timestamp


class BootStrap {

    def toLetter = { number ->
        number--
        def thirdLetter = number % 26
        def secondLetter = (number - thirdLetter) / 26
        def firstLetter = (number - thirdLetter - (secondLetter * 26)) / 26
        return String.valueOf((char)(firstLetter + 65)) + String.valueOf((char)(secondLetter + 65)) + String.valueOf((char)(thirdLetter + 65))
    }

    def init = { servletContext ->
        println "Loading database..."

        if(!Facility.list()) {
            def facility = new Facility(name: 'Facility A').save()
            println "Saved facility: ${facility.name}"
        }

        if(!Department.list()) {
            def department = new Department(name: "Department A" , facility: Facility.first()).save()
            println "Saved department: ${department.name} belongs to ${department.facility.name}"
        }

        if(!Machine.list()) {
            def machine = new Machine(name: "Machine AAA", department: Department.first()).save()
            println "Saved _machine: ${machine.name}"
        }


        def manifold = new Manifold(serialNumber: 1, machine: Machine.first()).save()
        println "Saved manifold: ${manifold.serialNumber}"


        if(!Station.list()) {
            def random = new Random()
            def numbers = [0, 3, 4, 8, 9]

            (0..4).each { i ->

                def station = new Station(
                        manifold: Manifold.first(),
                        number: numbers[ random.nextInt(numbers.size()) ]).save()
                println "Saved station: ${station.number}"
            }
        }

        if(!Alert.list()) {

            long offset = Timestamp.valueOf("2017-07-31 08:50:00").getTime();
            long end = Timestamp.valueOf("2017-08-01 23:59:59").getTime();
            long diff = end - offset + 1;

            (1..200).each { i ->

                def alert = new Alert(alertType: AlertType.getRandom(), valveSerial: (Math.random() * 100000000000000L), thrownAt: Date.from(new Timestamp(offset + (long)(Math.random() * diff)).toInstant()), isActive: new Random().nextBoolean(), station: Station.first()).save()
                println "Saved ${alert.alertType} alert at ${alert.thrownAt}"
            }

        }

        if(!Valve.list()) {
            new Valve(station: Station.first(), fabricationDate: new Date().time, shippingDate: new Date().time, sku: 'NX-DCV-whatevs').save()
        }
    }
    def destroy = {
    }
}

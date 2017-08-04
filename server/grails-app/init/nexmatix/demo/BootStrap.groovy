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
        ["Facility A", "Facility B", "Facility C"].each { name ->

            def facility = new Facility(name: name).save()
            println "Saved facility: ${facility.name}"

        }

        (1..9).each { i ->

            def department = new Department(name: "Department " + i, facility: Facility.get((i % 3) + 1)).save()
            println "Saved department: ${department.name} belongs to ${department.facility.name}"
        }

        (1..27).each { i ->

            def machine = new Machine(name: "Machine " + toLetter(i), department: Department.get((i%9)+1)).save()
            println "Saved _machine: ${machine.name}"
        }

        (1..108).each { i ->

            def manifold = new Manifold(name: "Manifold " + i, machine: Machine.get((i%27)+1)).save()
            println "Saved manifold: ${manifold.name}"
        }

        def random = new Random()
        def numbers = [0, 3, 4, 8, 9]

        (1..648).each { i ->

            def station = new Station(
                    serialNumber: "Station " + toLetter(i),
                    manifold: (i%108)+1,
                    number: numbers[ random.nextInt(numbers.size()) ]).save()
            println "Saved station: ${station.serialNumber}"
        }

        long offset = Timestamp.valueOf("2017-07-31 08:50:00").getTime();
        long end = Timestamp.valueOf("2017-08-01 23:59:59").getTime();
        long diff = end - offset + 1;

        (1..200).each { i ->

            def alert = new Alert(alertType: AlertType.getRandom(), valveSerial: (Math.random() * 100000000000000L), thrownAt: Date.from(new Timestamp(offset + (long)(Math.random() * diff)).toInstant()), isActive: new Random().nextBoolean(), station: (i%648)+1).save()
            println "Saved ${alert.alertType} alert at ${alert.thrownAt}"
        }



        new Valve(station: Station.first(), fabricationDate: new Date().time, latestStatus: null, shippingDate: new Date().time, sku: 'NX-DCV-whatevs').save()

    }
    def destroy = {
    }
}

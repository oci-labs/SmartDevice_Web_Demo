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

        def facility = new Facility(name: 'Facility A').save()
        println "Saved facility: ${facility.name}"


        def department = new Department(name: "Department A" , facility: 1).save()
        println "Saved department: ${department.name} belongs to ${department.facility.name}"

        def machine = new Machine(name: "Machine AAA", department: 1).save()
        println "Saved _machine: ${machine.name}"


        def manifold = new Manifold(name: "Manifold 1", machine: 1).save()
        println "Saved manifold: ${manifold.name}"

        def random = new Random()
        def numbers = [0, 3, 4, 8, 9]

        (0..4).each { i ->

            def station = new Station(
                    serialNumber: "Station " + toLetter(i+1),
                    manifold: 1,
                    number: numbers[i]).save()
            println "Saved station: ${station.serialNumber}"
        }

        long offset = Timestamp.valueOf("2017-07-31 08:50:00").getTime();
        long end = Timestamp.valueOf("2017-08-01 23:59:59").getTime();
        long diff = end - offset + 1;

        (1..200).each { i ->

            def alert = new Alert(alertType: AlertType.getRandom(), valveSerial: (Math.random() * 100000000000000L), thrownAt: Date.from(new Timestamp(offset + (long)(Math.random() * diff)).toInstant()), isActive: new Random().nextBoolean(), station: (i%5)+1).save()
            println "Saved ${alert.alertType} alert at ${alert.thrownAt}"
        }



        new Valve(station: Station.first(), fabricationDate: new Date().time, latestStatus: null, shippingDate: new Date().time, sku: 'NX-DCV-whatevs').save()

    }
    def destroy = {
    }
}

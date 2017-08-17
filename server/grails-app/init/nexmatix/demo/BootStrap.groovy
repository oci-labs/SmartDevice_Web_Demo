package nexmatix.demo

import com.nexmatix.Alert
import com.nexmatix.AlertType
import com.nexmatix.Department
import com.nexmatix.Facility
import com.nexmatix.Machine
import com.nexmatix.Manifold
import com.nexmatix.Station
import com.nexmatix.Valve
import com.nexmatix.ValveAlert
import com.nexmatix.ValveStatus

import java.sql.Timestamp


class BootStrap {

    def toLetter = { number ->
        number--
        def thirdLetter = number % 26
        def secondLetter = (number - thirdLetter) / 26
        def firstLetter = (number - thirdLetter - (secondLetter * 26)) / 26
        return String.valueOf((char) (firstLetter + 65)) + String.valueOf((char) (secondLetter + 65)) + String.valueOf((char) (thirdLetter + 65))
    }

    def init = { servletContext ->
        println "Loading database..."

        if (!Facility.list()) {
            def facility = new Facility(name: 'Facility A').save()
            println "Saved facility: ${facility.name}"
        }

        if (!Department.list()) {
            def department = new Department(name: "Department A", facility: Facility.first()).save()
            println "Saved department: ${department.name} belongs to ${department.facility.name}"
        }

        if (!Machine.list()) {
            def machine = new Machine(name: "Machine AAA", department: Department.first()).save()
            println "Saved _machine: ${machine.name}"
        }

        if (!Manifold.list()) {
            def manifold = new Manifold(serialNumber: 1, machine: Machine.first()).save()
            println "Saved manifold: ${manifold.serialNumber}"
        }

        if (!Station.list()) {

            (1..10).each { i ->

                def station = new Station(
                        manifold: Manifold.first(),
                        number: i).save()
                println "Saved station: ${station.number}"
            }
        }

        if (!Valve.list()) {
            Manifold m = Manifold.first()

            [1, 4, 5, 9, 10].each { i ->
                println "Creating valve ${100000 + (i - 1)} for station #${i}..."
                def valve = new Valve(stationNumber: Station.findByNumberAndManifold(i, m).number, manifoldSerialNumber: Manifold.first().serialNumber, serialNumber: 100000 + (i - 1), fabricationDate: new Date().time, shippingDate: new Date().time, updateTime: new Date().time, sku: "lalalalal+${1}")
                valve.save(failOnError: true)
                println "Valve saved with sku: ${valve.sku}"
            }

            Valve.list().each { valve ->
                println "Creating valve status for valve #${valve.serialNumber}..."
                new ValveStatus(cycleCount: 1000,
                        cycleCountLimit: 1010,
                        input: "A",
                        leak: "N",
                        manifoldSerialNumber: Manifold.first().serialNumber,
                        stationNumber: valve.stationNumber,
                        valveSerialNumber: valve.serialNumber,
                        pressurePoint: 100.0,
                        pressureFault: "N",
                        updateTime: new Date()).save(failOnError: true)

                new ValveAlert(
                        detectionTime: new Date(),
                        alertType: AlertType.LEAK,
                        valveSerialNumber: valve.serialNumber,
                        stationNumber: valve.stationNumber,
                        manifoldSerialNumber: valve.manifoldSerialNumber).save(failOnError: true)
            }


        }
    }
    def destroy = {
    }
}

package com.nexmatix

import com.nexmatix.Alert
import com.nexmatix.AlertType
import com.nexmatix.Department
import com.nexmatix.Facility
import com.nexmatix.Machine
import com.nexmatix.Manifold
import com.nexmatix.Role
import com.nexmatix.Station
import com.nexmatix.User
import com.nexmatix.UserRole
import com.nexmatix.Valve
import com.nexmatix.ValveAlert
import com.nexmatix.ValveStatus
import grails.util.Environment

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
        println "Loading database... 0.20"

        println "Checking facilities..."
        if (!Facility.list()) {
            def facility = new Facility(name: 'Facility A').save()
            println "Saved facility: ${facility.name}"
        } else {
            println "Facility: ${Facility.count()}"
        }

        println "Checking departments..."
        if (!Department.list()) {
            def department = new Department(name: "Department A", facility: Facility.first()).save()
            println "Saved department: ${department.name} belongs to ${department.facility.name}"
        } else {
            println "Department: ${Department.count()}"
        }

        println "Checking machines..."
        if (!Machine.list()) {
            def machine = new Machine(name: "Machine AAA", department: Department.first()).save()
            def machine2 = new Machine(name: "Machine BBB", department: Department.first()).save()
            println "Saved _machine: ${machine.name}"
        } else {
            println "Machine: ${Machine.count()}"
        }

        println "Checking manifolds..."
        if (!Manifold.list()) {
            def manifold = new Manifold(serialNumber: 1, name: 'Manifold ' + 1, machine: Machine.first()).save()
            def manifold2 = new Manifold(serialNumber: 2, name: 'Manifold ' + 2, machine: Machine.findByName("Machine BBB")).save()
            println "Saved manifold: ${manifold.serialNumber}"
        } else {
            println "Manifold: ${Manifold.count()}"
        }

        println "Checking stations..."
        if (!Station.list()) {

            (1..10).each { i ->

                def station = new Station(
                        manifold: Manifold.first(),
                        number: i).save()
                println "Saved station: ${station.number}"
            }
            (1..10).each { i ->
                def nonFaultStation = new Station(
                    manifold: Manifold.findBySerialNumber(2),
                    number: i).save()
            println "Saved nonFaultStation: ${nonFaultStation.number}"
           }
        } else {
            println "Station: ${Station.count()}"
        }

        println "Checking valves..."
        if (!Valve.list()) {
            println "No valves..."
            Manifold m = Manifold.first()

            println "Manifold: ${m}"

            [1, 4, 5, 9, 10].each { i ->
                println "Creating valve ${100000 + (i - 1)} for station #${i}..."
                def valve = new Valve(stationNumber: Station.findByNumberAndManifold(i, m).number, manifoldSerialNumber: Manifold.first().serialNumber, serialNumber: 100000 + (i - 1), fabricationDate: new Date(), shippingDate: new Date(), updateTime: new Date(), sku: "NX-DCV-SM-BLU-2-V0-L1-S0-00")
                if(!valve.save(flush: true)) {
                    valve.errors.allErrors.each { println it }
                }
                println "Valve saved with serialNumber: ${valve.serialNumber}"
            }

            Manifold second = Manifold.findBySerialNumber(2)
            Station secondStation = Station.findByManifold(second)
            [1, 2, 3, 4, 6, 9, 10].each { i ->
                println "Creating valve ${200000 + (i - 1)} for station #${i}..."
                def secondValve = new Valve(stationNumber: Station.findByNumberAndManifold(i, second).number, manifoldSerialNumber: second.serialNumber, serialNumber: 200000 + (i - 1), fabricationDate: new Date(), shippingDate: new Date(), updateTime: new Date(), sku: "NX-01-NCC-1701-BSG-SG1-S0-01-R5-${i+10}")
                if(!secondValve.save(flush: true)) {
                    secondValve.errors.allErrors.each { println it }
                }
                println "Second Valve saved with serialNumber: ${secondValve.serialNumber}"
            }

            println "Valves: ${Valve.count()}"

            if(Environment.isDevelopmentMode()) {

                Manifold first = Manifold.first()

                println "Development mode..."
                Valve.list().each { valve ->
                    println "Creating valve status for valve #${valve.serialNumber}..."
                    new ValveStatus(cycleCount: 1000,
                            cycleCountLimit: 1010,
                            input: "A",
                            leak: "N",
                            manifoldSerialNumber: valve.manifoldSerialNumber,
                            stationNumber: valve.stationNumber,
                            valveSerialNumber: valve.serialNumber,
                            pressurePoint: 100.0,
                            pressureFault: "N",
                            updateTime: new Date()).save(failOnError: true)
                }
                Valve.list().each { valve ->
                    if (valve.manifoldSerialNumber.equals(first.serialNumber)) {
                        new ValveAlert(
                                detectionTime: new Date(),
                                alertType: AlertType.PRESSURE_FAULT.id,
                                valveSerialNumber: valve.serialNumber,
                                stationNumber: valve.stationNumber,
                                manifoldSerialNumber: valve.manifoldSerialNumber).save(failOnError: true)

                        new ValveAlert(
                                detectionTime: new Date(),
                                alertType: AlertType.LEAK.id,
                                valveSerialNumber: valve.serialNumber,
                                stationNumber: valve.stationNumber,
                                manifoldSerialNumber: valve.manifoldSerialNumber).save(failOnError: true)
                    }
                }
            }

        } else {
            println "Valves: ${Valve.count()}"
            println "ValveAlerts: ${ValveAlert.count()}"
            println "ValveStatuses: ${ValveStatus.count()}"

        }
        if(User.count() < 1) {
            def adminRole = new Role(authority: 'ROLE_ADMIN').save()
            println "Role created ${adminRole.authority}"
            def testUser = new User(username: 'demoDan', password: 'password', email: 'testEmail@nexmatixdevtest@testingnexmatix.com').save()

            UserRole.create testUser, adminRole

            UserRole.withSession {
                it.flush()
                it.clear()
            }

            assert User.count() == 1
            assert Role.count() == 1
            assert UserRole.count() == 1

            println "Created User account."
        }
        if(User.count() < 2) {
            def adminRole = new Role(authority: 'ROLE_ADMIN').save()
            def testUser = new User(username: 'demoDena', password: 'password', email: 'testEmail@nexmatixdevtest@testingnexmatix.com').save()

            UserRole.create testUser, adminRole

            UserRole.withSession {
                it.flush()
                it.clear()
            }

            assert User.count() == 2

            println "Created User account."
        }

        println "Completed BootStrap."
    }
    def destroy = {
    }
}

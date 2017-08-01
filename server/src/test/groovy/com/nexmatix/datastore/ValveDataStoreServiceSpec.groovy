package com.nexmatix.datastore

import grails.testing.services.ServiceUnitTest
import org.grails.testing.GrailsUnitTest
import spock.lang.Specification

class ValveDataStoreServiceSpec extends Specification implements ServiceUnitTest<ValveDataStoreService>, GrailsUnitTest {

    def setup() {
    }

    def cleanup() {
    }

    void "testRetrieval"() {
        expect:
        service.retrieveValveData()
    }
}
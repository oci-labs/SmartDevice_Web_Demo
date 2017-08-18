package com.nexmatix.datastore

import grails.testing.services.ServiceUnitTest
import org.grails.testing.GrailsUnitTest
import spock.lang.Specification

class ValveStatusDataStoreServiceSpec extends Specification implements ServiceUnitTest<ValveStatusDataStoreService>, GrailsUnitTest {

    def setup() {
    }

    def cleanup() {
    }

    void "testRetrieval"() {
        expect:
        service.retrieveValveStatuses()
    }
}
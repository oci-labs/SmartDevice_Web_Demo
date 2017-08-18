package nexmatix.demo

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration

class Application extends GrailsAutoConfiguration {
    static void main(String[] args) {
        println "Running application..."
        GrailsApp.run(Application, args)
    }
}
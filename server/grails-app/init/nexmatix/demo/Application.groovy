package nexmatix.demo

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration
import org.springframework.scheduling.annotation.EnableScheduling

@EnableScheduling
class Application extends GrailsAutoConfiguration {
    static void main(String[] args) {
        println "Running application..."
        GrailsApp.run(Application, args)
    }
}
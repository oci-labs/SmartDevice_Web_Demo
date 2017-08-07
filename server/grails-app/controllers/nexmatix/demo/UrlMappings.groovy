package nexmatix.demo

import grails.util.Environment

class UrlMappings {

    static mappings = {
        "/api/machine/$action?/$id?(.$format)?" (controller: 'machine')
        "/api/valve/station/$stationNumber" (controller: 'valve', action: 'station')

        if ( Environment.current == Environment.PRODUCTION ) {
            '/'(uri: '/index.html')
        } else {
            '/'(controller: 'application', action:'index')
        }

        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}

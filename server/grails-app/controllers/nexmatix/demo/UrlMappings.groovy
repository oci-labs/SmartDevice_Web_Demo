package nexmatix.demo

import grails.util.Environment

class UrlMappings {

    static mappings = {

        "/api/valve/station/$manifold/$station"(controller: 'valve', action: 'byStation')

        if ( Environment.current == Environment.PRODUCTION ) {
            '/'(uri: '/index.html')
        } else {
            '/'(controller: 'application', action:'index')
        }

        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}

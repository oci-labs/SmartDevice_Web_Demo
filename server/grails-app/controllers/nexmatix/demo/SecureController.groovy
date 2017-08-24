package nexmatix.demo


import grails.rest.*
import grails.converters.*

class SecureController {
	static responseFormats = ['json']
	
    def index() {
        respond ({text: 'secure Controller'})
    }
}

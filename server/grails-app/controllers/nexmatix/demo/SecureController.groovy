package nexmatix.demo

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class SecureController {
	static responseFormats = ['json']
	@Secured('ROLE_ADMIN')
    def index() {
        response.setContentType("application/json")
        render '{"text": "secured content."}'
    }
}

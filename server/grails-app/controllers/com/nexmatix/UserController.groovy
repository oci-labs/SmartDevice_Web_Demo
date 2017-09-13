package com.nexmatix

import grails.plugin.springsecurity.annotation.Secured
import org.springframework.beans.factory.annotation.Autowired
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*
@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class UserController {
    static responseFormats = ['json', 'xml']

    @Autowired UserService userService

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond userService.list(params), model:[userCount: userService.count()]
    }

    def show(Long id) {
        respond userService.get(id)
    }

    def byUsername(String username) {
        respond userService.findByUsername(params.username)
    }

    def save(User user) {
        if (user == null) {
            render status: NOT_FOUND
            return
        }

        try {
            userService.save(user)
        } catch (ValidationException e) {
            respond user.errors, view:'create'
            return
        }

        respond user, [status: CREATED, view:"show"]
    }

    def update(User user) {
        if (user == null) {
            render status: NOT_FOUND
            return
        }

        try {
            userService.save(user)
        } catch (ValidationException e) {
            respond user.errors, view:'edit'
            return
        }

        respond user, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        userService.delete(id)

        render status: NO_CONTENT
    }
}

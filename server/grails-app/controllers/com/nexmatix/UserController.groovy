package com.nexmatix

import com.nexmatix.model.UserWithRole
import com.nexmatix.Role
import com.nexmatix.UserRole
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

    def withRoles(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        def users = userService.list(params)
        def usersWithRoles = users.collect { user ->
            def roles = user.getAuthorities().collect {role ->
                role.authority
            }
            userRole: new UserWithRole(user: user, roles: roles)
        }
        [usersWithRoles: usersWithRoles]
    }

    def save(User user) {
        if (user == null) {
            render status: NOT_FOUND
            return
        }

        try {
            def savedUser = userService.save(user)
            Role adminRole = Role.find{authority == 'ROLE_ADMIN'}

            println "Role is ${adminRole.authority}"

            UserRole.withSession {
                def userRole = new UserRole(user: savedUser, role: adminRole).save()
                it.flush()
                it.clear()
            }
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
        User u = User.get(id);

        if (id == null || u == null) {
            render status: NOT_FOUND
            return
        }
        
        UserRole.where{user == u}.list()*.delete()

        userService.delete(id)

        render status: NO_CONTENT
    }
}

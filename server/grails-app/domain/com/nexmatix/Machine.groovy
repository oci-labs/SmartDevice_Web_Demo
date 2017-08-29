package com.nexmatix

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@Resource(uri='/api/machine', formats = ['json'], readOnly = false)
@Secured(['ROLE_ADMIN', 'ROLE_AUTH'])
class Machine {

    String name
    Department department

    List<Manifold> getManifolds() {
        Manifold.withNewSession {
            Manifold.where { machine == this }.list()
        }
    }
}

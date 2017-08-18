package com.nexmatix

import grails.rest.Resource

@Resource(uri='/api/machine', formats = ['json'], readOnly = false)
class Machine {

    String name
    Department department

    List<Manifold> getManifolds() {
        Manifold.withNewSession {
            Manifold.where { machine == this }.list()
        }
    }
}

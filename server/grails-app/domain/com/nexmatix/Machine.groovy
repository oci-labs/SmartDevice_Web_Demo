package com.nexmatix

import grails.rest.Resource

class Machine {

    String name
    Department department

    List<Manifold> getManifolds() {
        Manifold.withNewSession {
            Manifold.where { machine == this }.list()
        }
    }
}

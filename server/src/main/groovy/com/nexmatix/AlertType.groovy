package com.nexmatix

enum AlertType {
    LEAK('leak'),
    PRESSURE_FAULT('pressure fault'),
    CYCLE_THRESHOLD('cycle count')

    String id

    static AlertType getRandom() {
        return values()[(int) (Math.random() * values().size())]
    }

    AlertType(String id){
        this.id = id
    }


    static AlertType lookup(String val) {
        AlertType.find { it.id == val } as AlertType
    }
}
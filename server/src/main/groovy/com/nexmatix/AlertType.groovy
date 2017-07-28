package com.nexmatix

enum AlertType {
    DATA_FAULT('dataFault'),
    DISCONNECTED('disconnected'),
    LIFECYCLE_COUNT_FAULT('lifecycleFault'),
    LIFECYCLE_COUNT_WARNING('lifecycleWarning'),
    PRESSURE_FAULT('pressureFault'),
    PRESSURE_WARNING('pressureWarning'),
    VALVE_FAULT('valveFault')
    String id

    static AlertType getRandom() {
        return values()[(int) (Math.random() * values().length)];
    }

    AlertType(String id){
        this.id = id
    }
}
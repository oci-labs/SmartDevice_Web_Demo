package com.nexmatix.model

import com.nexmatix.Valve

/**
 * Created by zak on 7/28/17.
 */
trait ValveDetails {

    Valve valve
//    String name
    Integer cycleCount
    Integer cycleCountLimit
    String input
    String leak
    String pressureFault
    Float pressurePoint
    Date updateTime
}

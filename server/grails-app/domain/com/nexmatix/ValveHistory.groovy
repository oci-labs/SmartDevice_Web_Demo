package com.nexmatix

import com.nexmatix.model.ValveDetails

class ValveHistory implements ValveDetails {

    Date dateCreated
    Valve valve

    //TODO implement GORM event listener to save current details from valve whenever a new record comes in (pre-update)
    //TODO: should this data be kept in the relational database or aggregated from the datastore?

    static constraints = {
    }
}

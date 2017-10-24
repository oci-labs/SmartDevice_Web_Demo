import store from "../store";

function getAlerts(state) {
    return state.alerts;
}

export function isStationInFault(station) {
    var itemsInAlert = [];
    var alerts = getAlerts(store.getState());

    alerts.map(alert => {
        if(alert.valve.id === station.valve.id) {
            itemsInAlert.push(alert);
        }
    });

    return itemsInAlert.length > 0;
}

export function isValveInFault(valve, alertType) {
    var itemsInAlert = [];
    var alerts = getAlerts(store.getState());

    alerts.map(alert => {
        if(alert.valve.id === valve.id && alert.alertType === alertType) {
            itemsInAlert.push(alert);
        }
    });

    return itemsInAlert.length > 0;
}

export function isInFault(item) {
    var itemsInAlert = [];
    var alerts = getAlerts(store.getState());

    alerts.map(alert => {
       switch(item.type) {
           case "facility":
               if(alert.valve.facility.id === item.id) {
                   itemsInAlert.push(alert);
               }
               break;
           case "department":
               if(alert.valve.department.id === item.id) {
                   itemsInAlert.push(alert);
               }
               break;
           case "machine":
               if(alert.valve.machine.id === item.id) {
                   itemsInAlert.push(alert);
               }
               break;
           case "manifold":
               if(alert.valve.manifold.id === item.id) {
                   itemsInAlert.push(alert);
               }
               break;
           default:
               break;
       }
    });
}

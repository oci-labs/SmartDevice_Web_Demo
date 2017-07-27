updateList() {
    console.log('update list')
}
render() {
    let alerts;
    const updateList = this.updateList;
    if (this.props.alerts) {
        let activeAlerts = this.props.alerts.filter(alert => {
            return alert.isActive === true;
        });
        let inactiveAlerts = this.props.alerts.filter(alert => {
            return alert.isActive === false;
        });
        let groupedAlerts = activeAlerts.concat(inactiveAlerts);
        alerts = groupedAlerts.map(function(alert) {
            return (
                <ValveAlert
                    key={alert.id}
                    leftIcon="Disconnected"
                    isActive={alert.isActive}
                    valveNumber={alert.valveSerial}
                    alertType={alert.alertType}
                    station={alert.station.id}
                    time={alert.thrownAt}
                    callback={updateList}
                    handleDismiss={handleDismiss}
                />
            );
        });
    }
    return (
        <div className="alertsContainer">
            {alerts}
            {/*  <ValveAlert color="danger" leftIcon="Disconnected" isActive={true} valveNumber="1001014" alertType="Disconnected" station="6/6" time="1:15pm"/>
                <ValveAlert color="danger" leftIcon="Disconnected"  isActive={true} valveNumber="1001014" alertType="Disconnected" station="6/6" time="1:15pm"/>
                <ValveAlert color="danger" leftIcon="Disconnected" isActive={true} valveNumber="1001014" alertType="Disconnected" station="6/6" time="1:15pm"/>
                <ValveAlert color="info" leftIcon="Disconnected" isActive={false} valveNumber="20100105" alertType="Disconnected" station="6/5" time="11:42am"/>
                <ValveAlert color="disabled" leftIcon="Gauge" isActive={false} valveNumber="20100105" alertType="Disconnected" station="6/5" time="11:42am" /> */}
        </div>
    );
}
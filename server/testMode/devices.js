let devices = {
    '10.0.0.11': {
        module_type: 'SONOFF_4CH',
        ip: '10.0.0.11',
        POWER1: true,
        POWER2: true,
        POWER3: false,
        POWER4: false
    },
    '10.0.0.12': {
        module_type: 'SONOFF_TOUCH',
        ip: '10.0.0.12',
        POWER1: false
    },
    '10.0.0.27': {
        module_type: 'SONOFF_BASIC',
        ip: '10.0.0.27',
        POWER1: true
    },
    '10.0.0.3': {
        module_type: 'SONOFF_BASIC',
        ip: '10.0.0.3',
        POWER1: false
    }
}





module.exports = {
    getDevicesData: function () {
        return devices;
    },
    setDevicesData: function (ip, power, state) {
        devices[ip][power] = state;
        console.log(devices[ip]);
    }
};
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


let time = new Date().getTime();
console.log(time);


let self = module.exports = {
    getDevicesData: function () {
        return devices;
    },
    setDevicesData: function (ip, power, state) {
        devices[ip][power] = state;
        console.log("set device");
        console.log(devices[ip]);
    },
    getTimeN: function () {
        return time;
    },
    setTimeN: function (timeNew) {
        time = new Date().setTime(timeNew);
    },
    addDevice: function (ip, module_type) {

        switch (module_type) {
            case 'SONOFF_4CH': {
                devices[ip] = {
                    module_type: module_type,
                    ip: ip,
                    POWER1: false,
                    POWER2: false,
                    POWER3: false,
                    POWER4: false
                }
                break;
            }
            case 'SONOFF_BASIC': {
                devices[ip] = {
                    module_type: module_type,
                    ip: ip,
                    POWER1: false
                }
                break;
            }
            case 'SONOFF_TOUCH': {
                devices[ip] = {
                    module_type: module_type,
                    ip: ip,
                    POWER1: false
                }
                break;
            }
            default: {
                devices[ip] = {
                    module_type: 'SONOFF_BASIC',
                    ip: ip,
                    POWER1: false
                }
            }
        }
        console.log("adddevices");
        console.log(devices);

    },
    removeDevice: function (ip) {
        console.log("removedevices");
        console.log(devices);
        devices[ip] = undefined;
        console.log(devices);
    },
    editDevice: function (oldIp, oldModule_type, newIp) {
        console.log("editdevices");
        delete devices[oldIp];
        self.addDevice(newIp, oldModule_type);
    }

};

const _db = require('./database').getDb();
const request = require('request');
const devicesData = require('../modules/testMode/devices');

const testMode = require('../config/config').testMode;

let statChanged;
let ips = new Array;
let devices = new Array;

if (testMode) {
    devices = devicesData.getDevicesData();
    console.log('TestMode is ON');
}

function refreshStat() {
    if (devicesData.getTimeN() < new Date().getTime()) {
        clearInterval(statChanged);
        statChanged = null;
        console.log('Get device status service stopped');
    }
    if (testMode) {
        devices = devicesData.getDevicesData();
    } else {
        for (let i in ips) {
            const url = 'http://' + ips[i].ip + '/cm?cmnd=Status 11';
            request.get(url, (error, response, body) => {
                if (error) {
                    console.log('Failed to get status for ' + ips[i].ip);
                }
                else if (response.statusCode == 200) {
                    let res = JSON.parse(response.body.split('=')[1]);
                    if (res.StatusSTS.POWER1) {
                        devices[i] = {
                            module_type: ips[i].module_type,
                            ip: ips[i].ip,
                            POWER1: res.StatusSTS.POWER
                        }
                    } else if (res.StatusSTS.POWER1) {
                        devices[i] = {
                            module_type: ips[i].module_type,
                            ip: ips[i].ip,
                            POWER1: res.StatusSTS.POWER1,
                            POWER2: res.StatusSTS.POWER2,
                            POWER3: res.StatusSTS.POWER3,
                            POWER4: res.StatusSTS.POWER4
                        }
                    }
                } else {
                    console.log('Error ' + response.statusCode + ' for ' + ips[i].ip);
                }
            });
        }
    }
}

module.exports = {
    getIps: function () {
        const query = 'SELECT ip, module_type  FROM device';

        _db.query(query, (error, results) => {
            if (error) {
                Console.log('db request fail');
            } else if (results.length < 1) {
                console.log('404 no device found');
            } else {
                for (let i in results) {
                    ips.push({
                        ip: results[i].ip,
                        module_type: results[i].module_type
                    });
                }
            }
        });
    },
    intervalStart: function () {
        if (!statChanged) {
            statChanged = setInterval(refreshStat, 1000);
        }
    },
    intervalStop: function () {
        clearInterval(statChanged);
        statChanged = null;
    },
    getDevices: function () {
        return devices;
    },
    isRunning: function () {
        return statChanged;
    }
}

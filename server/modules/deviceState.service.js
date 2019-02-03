/**
 * This service can request from all devices that are in the databese the current statuses. 
 * The statuses is saved on the server and if a client requests it will send it back to the client
 * If a client is logged in and visits the Devices page on the front-end a intervall is started on the client the 
 * requests the statuses from the server the server than starts pulling the data from the devices and send the status back to the client
 * there is only one interval running on the server no matter how many users request statuses data
 * 
 * @author Manuel Dielacher, Philipp Freislich
 */

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
                } else if (response.statusCode == 200) {
                    const res = JSON.parse(response.body.split('=')[1]);
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
        _db.query('SELECT ip, module_type  FROM device', (error, results) => {
            if (error) {
                Console.log('DeviceState service database request failed');
            } else if (results.length < 1) {
                console.log('DeviceState service 404 no device found in Database');
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

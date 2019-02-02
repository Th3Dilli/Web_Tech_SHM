const _db = require('../controller').getDb();
const request = require("request");
const devicesData = require('../testMode/devices');

const testMode = require("../config").testMode;

let statChanged;
let ips = new Array;
let devices = new Array;
let time = new Date;

if (testMode) {
    devices = devicesData.getDevicesData();
    console.log("TestMode is ON");
}

function refreshStat() {
    if (devicesData.getTimeN() < new Date().getTime()) {
        clearInterval(statChanged);
        statChanged = null;
        console.log("stop service");
    }
    console.log(devicesData.getTimeN());
    console.log(new Date().getTime());
    console.log(devicesData.getTimeN() < new Date().getTime());
    if (testMode) {
            devices = devicesData.getDevicesData();
    } else {
        for (let i in ips) {
            const url = 'http://' + ips[i].ip + '/cm?cmnd=Status ' + "11";
            request.get(url, (error, response, body) => {
                if (error) {
                    // TODO add logging
                    //console.log(ips[i].ip + " Failed");
                }
                else if (response.statusCode == 200) {
                    console.log(ips[i].ip + " status changed");
                    let res = JSON.parse(response.body.split("=")[1]);

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
                    // TODO if !error and !200 OK
                    console.log(ips[i].ip + response.statusCode);
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
                Console.log("db request fail");
            } else if (results.length < 1) {
                console.log("404 no device found");
            } else {
                for (let i in results) {
                    ips.push({
                        ip: results[i].ip,
                        module_type: results[i].module_type
                    });
                }
                console.log(ips);
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
    isRunning: function() {
        return statChanged;
    }
}

const _db = require('../controller').getDb();
const request = require("request");
const devicesData = require('../testMode/devices');

const testMode = require("../config").testMode;

let countUsersLoggedIn = 0;
let usersLoggedIn = false;
let statChanged;
let ips = new Array;
let devices = new Array;

if (testMode) {
    devices = devicesData.getDevicesData();
    console.log("TestMode is ON");
}

function refreshStat() {
    if (testMode) {
            devices = devicesData.getDevicesData();
    } else {
        for (let i in ips) {
            const url = 'http://' + ips[i].ip + '/cm?cmnd=Status ' + "11";
            request.get(url, (error, response, body) => {
                //console.log(response.body.split("=")[1]);
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
    interval: function () {
        if ((countUsersLoggedIn > 0) && !usersLoggedIn) {
            usersLoggedIn = true;
            statChanged = setInterval(refreshStat, 1000);
        }
    },
    intervalStop: function () {
        clearInterval(statChanged);
    },
    getIps: function () {
        countUsersLoggedIn++;
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
    getDevices: function () {
        return devices;
    }
}

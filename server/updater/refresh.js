const _db = require('../controller').getDb();
const request = require("request");

let countUsersLoggedIn = 0;
let usersLoggedIn = false;
let statChanged;
let ips = new Array;
let devices = new Array;

// TODO remove test stuff begin
/*let testIps = new Array;
let lelRes = new Array;
lelRes.push({ "StatusSTS": { "Time": "2019-01-27T22:48:22", "Uptime": 3, "Vcc": 3.117, "POWER1": "ON", "POWER2": "OFF", "POWER3": "OFF", "POWER4": "OFF", "Wifi": { "AP": 1, "SSId": "Freislich-Wlan", "RSSI": 50, "APMac": "C4:EA:1D:0C:D4:31" } } });
lelRes.push({ "StatusSTS": { "Time": "2019-01-27T22:48:41", "Uptime": 4, "Vcc": 3.194, "POWER": "OFF", "Wifi": { "AP": 1, "SSId": "Freislich-Wlan", "RSSI": 72, "APMac": "58:6D:8F:4A:7C:36" } } });
lelRes.push({ "StatusSTS": { "Time": "2019-01-27T22:48:41", "Uptime": 4, "Vcc": 3.194, "POWER": "OFF", "Wifi": { "AP": 1, "SSId": "Freislich-Wlan", "RSSI": 72, "APMac": "58:6D:8F:4A:7C:36" } } });
lelRes.push({ "StatusSTS": { "Time": "2019-01-27T22:48:41", "Uptime": 4, "Vcc": 3.194, "POWER": "OFF", "Wifi": { "AP": 1, "SSId": "Freislich-Wlan", "RSSI": 72, "APMac": "58:6D:8F:4A:7C:36" } } });
testIps.push('10.0.0.11');
testIps.push('10.0.0.12');
testIps.push('10.0.0.27');
testIps.push('10.0.0.3');

for (let i = 0; i < lelRes.length; i++) {
    if (lelRes[i].StatusSTS.POWER) {
        devices[i] = { ip: testIps[i],
                        POWER: lelRes[i].StatusSTS.POWER    
                     }
    } else if (lelRes[i].StatusSTS.POWER1) {
        devices[i] = { ip: testIps[i],
            POWER1: lelRes[i].StatusSTS.POWER1,
            POWER2: lelRes[i].StatusSTS.POWER2,
            POWER3: lelRes[i].StatusSTS.POWER3,
            POWER4: lelRes[i].StatusSTS.POWER4 
         }
    }
}*/
// TODO remove test stuff end

console.log(devices);
function refreshStat() {
    for (let i in ips) {
        const url = 'http://' + ips[i] + '/cm?cmnd=Status ' + "11";
        request.get(url, (error, response, body) => {
            //console.log(response.body.split("=")[1]);
            if (error) {
                // TODO add logging
                //console.log(ips[i] + " Failed");
            }
            else if (response.statusCode == 200) {
                console.log(ips[i] + " status changed");
                let res= JSON.parse(response.body.split("=")[1]);
                
                if (res.StatusSTS.POWER) {
                    devices[i] = { ip: ips[i],
                                    POWER: res.StatusSTS.POWER    
                                 }
                } else if (res.StatusSTS.POWER1) {
                    devices[i] = { ip: ips[i],
                        POWER1: res.StatusSTS.POWER1,
                        POWER2: res.StatusSTS.POWER2,
                        POWER3: res.StatusSTS.POWER3,
                        POWER4: res.StatusSTS.POWER4 
                     }
                }

            } else {
                // TODO if !error and !200 OK
                console.log(ips[i] + response.statusCode);
            }
        });
    }
    console.log(devices);
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
        const query = 'SELECT ip FROM device';

        _db.query(query, (error, results) => {
            if (error) {
                Console.log("db request fail");
            } else if (results.length < 1) {
                console.log("404 no device found");
            } else {
                for (let i in results) {
                    ips.push(results[i].ip);
                }
                console.log(ips);
            }
        });
    }
}

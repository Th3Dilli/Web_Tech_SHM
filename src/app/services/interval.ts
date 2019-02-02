export interface DevicesStats {
    devices: Object[];
}

export interface DeviceBasic {
    ip: String;
    module_type: String;
    POWER: String;
}


export interface Device4CH {
    ip: String;
    module_type: String;
    POWER1: String;
    POWER2: String;
    POWER3: String;
    POWER4: String;
}

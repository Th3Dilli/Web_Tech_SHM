export interface DevicesStats
{
    devices: Device_4CH[];
}

export interface Device_Basic
{
    ip: String;
    module_type: String;
    POWER: String;
}


export interface Device_4CH
{
    ip: String;
    module_type: String;
    POWER1: String;
    POWER2: String;
    POWER3: String;
    POWER4: String;
}
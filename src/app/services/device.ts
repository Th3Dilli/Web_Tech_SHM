export interface Device {
    device_id: number;
    module_type: string;
    device_name: string;
    ip: string;
    room_name: string;
    mac: String;
    stat: Object;
  }
export interface Room {
  rooms_id: Number;
  name: String;
}

export interface DeviceData {
  devices: Device[];
  rooms: Room[];
}

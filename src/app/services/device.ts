export interface Device {
    id: number;
    module_type: string;
    name: string;
    ip: string;
    room_name: string;
  }
export interface Room {
  rooms_id: Number;
  name: String;
}

export interface DeviceData {
  devices: Device[];
  rooms: Room[];
}

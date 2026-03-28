export type MotorSide = "left" | "right";

export interface Cb19GateCardConfig {
  type: string;
  controller: string;
  title?: string;
  show_controls?: boolean;
  show_status?: boolean;
  show_debug?: boolean;
  settings_device_entity?: string;
  settings_path?: string;
  motor1_side?: MotorSide;
  entities?: Partial<GateEntitiesConfig>;
}

export interface GateEntitiesConfig {
  gate_position: string;
  motor1_position: string;
  motor2_position: string;
  gate_state: string;
  last_ack: string;
  moving: string;
  fully_opened: string;
  fully_closed: string;
  ped_opened: string;
  manual_stop: string;
  photocell: string;
  obstruction: string;
  pedestrian_mode: string;
  open_button: string;
  close_button: string;
  stop_button: string;
  pedestrian_button: string;
}

export interface GateEntities {
  gatePosition: string;
  motor1Position: string;
  motor2Position: string;
  gateState: string;
  lastAck: string;
  moving: string;
  fullyOpened: string;
  fullyClosed: string;
  pedOpened: string;
  manualStop: string;
  photocell: string;
  obstruction: string;
  pedestrianMode: string;
  openButton: string;
  closeButton: string;
  stopButton: string;
  pedestrianButton: string;
}

export interface GateStatus {
  position: number | null;
  motor1Position: number | null;
  motor2Position: number | null;
  rawState: string;
  label: string;
  moving: boolean;
  fullyOpened: boolean;
  fullyClosed: boolean;
  pedOpened: boolean;
  manualStop: boolean;
  photocell: boolean;
  obstruction: boolean;
  pedestrianEnabled: boolean;
  lastAck: string;
}
export type PedestrianSide = "left" | "right" | false;

export interface Cb19GateCardConfig {
  type: string;
  controller: string;
  title?: string;
  show_controls?: boolean;
  show_status?: boolean;
  show_debug?: boolean;
  pedestrian_side?: PedestrianSide;
  entities?: Partial<GateEntitiesConfig>;
}

export interface GateEntitiesConfig {
  gate_position: string;
  gate_state: string;
  last_ack: string;
  moving: string;
  fully_opened: string;
  fully_closed: string;
  ped_opened: string;
  manual_stop: string;
  photocell: string;
  obstruction: string;
  open_button: string;
  close_button: string;
  stop_button: string;
  pedestrian_button: string;
}

export interface GateEntities {
  gatePosition: string;
  gateState: string;
  lastAck: string;
  moving: string;
  fullyOpened: string;
  fullyClosed: string;
  pedOpened: string;
  manualStop: string;
  photocell: string;
  obstruction: string;
  openButton: string;
  closeButton: string;
  stopButton: string;
  pedestrianButton: string;
}

export interface GateStatus {
  position: number | null;
  rawState: string;
  label: string;
  moving: boolean;
  fullyOpened: boolean;
  fullyClosed: boolean;
  pedOpened: boolean;
  manualStop: boolean;
  photocell: boolean;
  obstruction: boolean;
  lastAck: string;
}
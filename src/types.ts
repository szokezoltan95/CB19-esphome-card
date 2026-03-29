export type MotorSide = "left" | "right";
export type SettingsAction = "device_page" | "more_info" | false;
export type ViewMode = "graphic" | "text" | "hybrid";
export type SettingsButtonPosition = "header" | "graphic" | "none";
export type ActiveEffect = "none" | "pulse" | "blink" | "glow";
export type ControlName = "open" | "stop" | "close" | "pedestrian";

export interface Cb19GateCardConfig {
  type: string;
  controller: string;
  motor1_side?: MotorSide;
  show_debug?: boolean;
  settings_action?: SettingsAction;
  settings_path?: string;
  settings_entity?: string;
  settings_device_entity?: string;
  entities?: Partial<GateEntitiesConfig>;
  ui?: Partial<CardUiConfig>;
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

export interface AvailableActions {
  open: boolean;
  stop: boolean;
  close: boolean;
  pedestrian: boolean;
}

export interface CardUiConfig {
  view_mode: ViewMode;

  header: {
    enabled: boolean;
    title: string;
    show_state: boolean;
    show_position: boolean;
    settings_button_position: SettingsButtonPosition;
  };

  settings_button: {
    enabled: boolean;
  };

  controls: {
    enabled: boolean;
    show_open: boolean;
    show_stop: boolean;
    show_close: boolean;
    show_pedestrian: boolean | "auto";
    available_action_tint: boolean;
  };

  icons: {
    open: string;
    stop: string;
    close: string;
    pedestrian: string;
  };

  icon_tune: {
    x: number;
    y: number;
    open_x: number;
    open_y: number;
    stop_x: number;
    stop_y: number;
    close_x: number;
    close_y: number;
    pedestrian_x: number;
    pedestrian_y: number;
  };

  colors: {
    icon_default: Record<ControlName, string>;
    icon_active: Record<ControlName, string>;
    icon_available: Record<ControlName, string>;
  };

  effects: {
    active_action: ActiveEffect;
  };

  padding: {
    card: string;
    visual: string;
    controls_top: string;
    header_bottom: string;
    content_gap: string;
  };
}
import type { Cb19GateCardConfig, GateEntities } from "../types";

export function buildEntities(config: Cb19GateCardConfig): GateEntities {
  const controller = config.controller;
  const overrides = config.entities ?? {};

  return {
    gatePosition:
      overrides.gate_position ?? `sensor.${controller}_gate_position`,
    motor1Position:
      overrides.motor1_position ?? `sensor.${controller}_motor1_position`,
    motor2Position:
      overrides.motor2_position ?? `sensor.${controller}_motor2_position`,
    gateState:
      overrides.gate_state ?? `sensor.${controller}_gate_state`,
    lastAck:
      overrides.last_ack ?? `sensor.${controller}_last_ack`,
    moving:
      overrides.moving ?? `binary_sensor.${controller}_moving`,
    fullyOpened:
      overrides.fully_opened ?? `binary_sensor.${controller}_fully_opened`,
    fullyClosed:
      overrides.fully_closed ?? `binary_sensor.${controller}_fully_closed`,
    pedOpened:
      overrides.ped_opened ?? `binary_sensor.${controller}_ped_opened`,
    manualStop:
      overrides.manual_stop ?? `binary_sensor.${controller}_manual_stop`,
    photocell:
      overrides.photocell ?? `binary_sensor.${controller}_photocell`,
    obstruction:
      overrides.obstruction ?? `binary_sensor.${controller}_obstruction`,
    pedestrianMode:
      overrides.pedestrian_mode ?? `select.${controller}_fc_pedestrian_mode`,
    openButton:
      overrides.open_button ?? `button.${controller}_open`,
    closeButton:
      overrides.close_button ?? `button.${controller}_close`,
    stopButton:
      overrides.stop_button ?? `button.${controller}_stop`,
    pedestrianButton:
      overrides.pedestrian_button ?? `button.${controller}_pedestrian_open`,
  };
}
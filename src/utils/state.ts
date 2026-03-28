import type { GateEntities, GateStatus } from "../types";

function isOn(state: string | undefined): boolean {
  return state === "on";
}

function safeState(hass: any, entityId: string): string {
  return hass?.states?.[entityId]?.state ?? "";
}

function safeNumberState(hass: any, entityId: string): number | null {
  const value = hass?.states?.[entityId]?.state;
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "unknown" ||
    value === "unavailable"
  ) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeMovingLabel(rawState: string): string {
  const s = rawState.trim().toLowerCase();

  switch (s) {
    case "opening":
      return "Opening";
    case "closing":
      return "Closing";
    case "pedopening":
      return "Ped Opening";
    default:
      return "Moving";
  }
}

function isPedestrianModeEnabled(mode: string): boolean {
  const s = mode.trim().toLowerCase();
  return s.includes("enabled");
}

export function computeGateStatus(hass: any, entities: GateEntities): GateStatus {
  const rawState = safeState(hass, entities.gateState);
  const lastAck = safeState(hass, entities.lastAck);

  const moving = isOn(safeState(hass, entities.moving));
  const fullyOpened = isOn(safeState(hass, entities.fullyOpened));
  const fullyClosed = isOn(safeState(hass, entities.fullyClosed));
  const pedOpened = isOn(safeState(hass, entities.pedOpened));
  const manualStop = isOn(safeState(hass, entities.manualStop));
  const photocell = isOn(safeState(hass, entities.photocell));
  const obstruction = isOn(safeState(hass, entities.obstruction));

  const pedestrianMode = safeState(hass, entities.pedestrianMode);
  const pedestrianEnabled = isPedestrianModeEnabled(pedestrianMode);

  const position = safeNumberState(hass, entities.gatePosition);
  const motor1Position = safeNumberState(hass, entities.motor1Position);
  const motor2Position = safeNumberState(hass, entities.motor2Position);

  let label = "Unknown";

  if (obstruction) {
    label = "Obstructed";
  } else if (manualStop) {
    label = "Stopped";
  } else if (fullyClosed) {
    label = "Closed";
  } else if (fullyOpened) {
    label = "Open";
  } else if (pedOpened) {
    label = "Ped Open";
  } else if (moving) {
    label = normalizeMovingLabel(rawState);
  } else if (rawState) {
    label = rawState;
  }

  return {
    position,
    motor1Position,
    motor2Position,
    rawState,
    label,
    moving,
    fullyOpened,
    fullyClosed,
    pedOpened,
    manualStop,
    photocell,
    obstruction,
    pedestrianEnabled,
    lastAck,
  };
}
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

  const position = safeNumberState(hass, entities.gatePosition);

  let label = "Unknown";

  if (obstruction) {
    label = "Obstructed";
  } else if (manualStop) {
    label = "Stopped";
  } else if (moving) {
    if (rawState) {
      const normalized = rawState.toLowerCase();
      if (normalized.includes("open")) {
        label = "Opening";
      } else if (normalized.includes("close")) {
        label = "Closing";
      } else {
        label = "Moving";
      }
    } else {
      label = "Moving";
    }
  } else if (pedOpened) {
    label = "Ped Open";
  } else if (fullyOpened) {
    label = "Open";
  } else if (fullyClosed) {
    label = "Closed";
  } else if (rawState) {
    label = rawState;
  }

  return {
    position,
    rawState,
    label,
    moving,
    fullyOpened,
    fullyClosed,
    pedOpened,
    manualStop,
    photocell,
    obstruction,
    lastAck,
  };
}
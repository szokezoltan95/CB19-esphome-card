import type { GateEntities, GateStatus } from "../types";

function isOn(state: string | undefined): boolean {
  return state === "on";
}

function safeState(hass: any, entityId: string): string {
  return hass?.states?.[entityId]?.state ?? "";
}

function safeNumberState(hass: any, entityId: string): number | null {
  const value = hass?.states?.[entityId]?.state;
  if (value === undefined || value === null || value === "" || value === "unknown" || value === "unavailable") {
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

  let label = rawState || "Unknown";

  if (obstruction) {
    label = "Obstruction";
  } else if (photocell) {
    label = "Photocell active";
  } else if (manualStop) {
    label = "Stopped";
  } else if (moving) {
    if (position !== null) {
      if (position >= 100) {
        label = "Opening";
      } else if (position <= 0) {
        label = "Closing";
      } else {
        label = "Moving";
      }
    } else {
      label = "Moving";
    }
  } else if (pedOpened) {
    label = "Pedestrian open";
  } else if (fullyOpened) {
    label = "Open";
  } else if (fullyClosed) {
    label = "Closed";
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
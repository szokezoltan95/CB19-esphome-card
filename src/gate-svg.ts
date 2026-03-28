import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { GATE_SVG } from "./gate-art";
import type { GateStatus, MotorSide } from "./types";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value: number): string {
  return Number(value.toFixed(5)).toString();
}

function getWingOpenRatio(position: number | null, fallback: number): number {
  if (position !== null) {
    return clamp(position / 100, 0, 1);
  }
  return fallback;
}

function isPedOpening(rawState: string): boolean {
  return rawState.trim().toLowerCase() === "pedopening";
}

function buildLeftWingStyle(openness: number): string {
  const t = clamp(openness, 0, 1);
  const minScale = 0.035;
  const scaleX = Math.max(minScale, Math.cos((t * Math.PI) / 2));

  return [
    "transform-box: fill-box",
    "transform-origin: left center",
    `transform: scaleX(${formatNumber(scaleX)})`,
  ].join("; ");
}

function buildRightWingStyle(openness: number): string {
  const t = clamp(openness, 0, 1);
  const minScale = 0.035;
  const scaleX = Math.max(minScale, Math.cos((t * Math.PI) / 2));

  return [
    "transform-box: fill-box",
    "transform-origin: right center",
    `transform: scaleX(${formatNumber(scaleX)})`,
  ].join("; ");
}

export function renderGateSvg(status: GateStatus, motor1Side: MotorSide) {
  const fallbackGlobalRatio =
    status.position !== null
      ? clamp(status.position / 100, 0, 1)
      : status.fullyOpened
        ? 1
        : status.fullyClosed
          ? 0
          : status.pedOpened
            ? 0.45
            : 0;

  const motor1Ratio = getWingOpenRatio(status.motor1Position, fallbackGlobalRatio);
  const motor2Ratio = getWingOpenRatio(status.motor2Position, fallbackGlobalRatio);

  const pedOpening = status.moving && isPedOpening(status.rawState);
  const pedOpened = status.pedOpened;
  const pedestrianActive = status.pedestrianEnabled && (pedOpening || pedOpened);

  let leftRatio: number;
  let rightRatio: number;

  if (pedestrianActive) {
    if (motor1Side === "left") {
      leftRatio = motor1Ratio;
      rightRatio = 0;
    } else {
      leftRatio = 0;
      rightRatio = motor1Ratio;
    }
  } else {
    if (motor1Side === "left") {
      leftRatio = motor1Ratio;
      rightRatio = motor2Ratio;
    } else {
      leftRatio = motor2Ratio;
      rightRatio = motor1Ratio;
    }
  }

  const leftStyle = buildLeftWingStyle(leftRatio);
  const rightStyle = buildRightWingStyle(rightRatio);

  const svgWithTransforms = GATE_SVG
    .replace(
      '<g id="left-wing-group" data-pivot-x="2252.13" data-pivot-y="3896.42">',
      `<g id="left-wing-group" data-pivot-x="2252.13" data-pivot-y="3896.42" style="${leftStyle}">`
    )
    .replace(
      '<g id="right-wing-group" data-pivot-x="18265.30" data-pivot-y="3896.42">',
      `<g id="right-wing-group" data-pivot-x="18265.30" data-pivot-y="3896.42" style="${rightStyle}">`
    );

  return html`
    <div class="gate-svg-wrap">
      ${unsafeHTML(svgWithTransforms)}
    </div>
  `;
}
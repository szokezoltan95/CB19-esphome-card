import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { GATE_SVG } from "./gate-art";
import type { GateStatus, PedestrianSide } from "./types";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value: number): string {
  return Number(value.toFixed(4)).toString();
}

function buildWingTransform(
  side: "left" | "right",
  openness: number,
  pivotX: number,
  pivotY: number
): string {
  const t = clamp(openness, 0, 1);

  const minScale = 0.04;
  const scaleX = Math.max(minScale, Math.cos((t * Math.PI) / 2));

  const skewDeg = (side === "left" ? -1 : 1) * t * 6;
  const skewTan = Math.tan((skewDeg * Math.PI) / 180);

  const a = scaleX;
  const b = 0;
  const c = skewTan;
  const d = 1;
  const e = pivotX - a * pivotX - c * pivotY;
  const f = pivotY - d * pivotY;

  return `matrix(${formatNumber(a)} ${formatNumber(b)} ${formatNumber(c)} ${formatNumber(d)} ${formatNumber(e)} ${formatNumber(f)})`;
}

function getOpenRatio(status: GateStatus): number {
  if (status.position !== null) {
    return clamp(status.position / 100, 0, 1);
  }

  if (status.fullyOpened) {
    return 1;
  }

  if (status.fullyClosed) {
    return 0;
  }

  return 0;
}

function isPedestrianState(rawState: string): boolean {
  const s = rawState.trim().toLowerCase();
  return s === "pedopening" || s === "pedopened" || s === "pedopen";
}

export function renderGateSvg(status: GateStatus, pedestrianSide: PedestrianSide) {
  const openRatio = getOpenRatio(status);
  const pedestrianActive = pedestrianSide !== false && isPedestrianState(status.rawState);

  const pedestrianFallbackRatio = openRatio > 0 ? openRatio : 0.45;

  const leftRatio = pedestrianActive
    ? pedestrianSide === "left"
      ? pedestrianFallbackRatio
      : 0
    : openRatio;

  const rightRatio = pedestrianActive
    ? pedestrianSide === "right"
      ? pedestrianFallbackRatio
      : 0
    : openRatio;

  const leftTransform = buildWingTransform("left", leftRatio, 2252.13, 3896.42);
  const rightTransform = buildWingTransform("right", rightRatio, 18265.3, 3896.42);

  const svgWithTransforms = GATE_SVG
    .replace(
      '<g id="left-wing-group" data-pivot-x="2252.13" data-pivot-y="3896.42">',
      `<g id="left-wing-group" data-pivot-x="2252.13" data-pivot-y="3896.42" transform="${leftTransform}">`
    )
    .replace(
      '<g id="right-wing-group" data-pivot-x="18265.30" data-pivot-y="3896.42">',
      `<g id="right-wing-group" data-pivot-x="18265.30" data-pivot-y="3896.42" transform="${rightTransform}">`
    );

  return html`
    <div class="gate-svg-wrap">
      ${unsafeHTML(svgWithTransforms)}
    </div>
  `;
}
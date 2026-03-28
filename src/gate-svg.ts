import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { GATE_SVG } from "./gate-art";
import type { GateStatus, PedestrianSide } from "./types";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
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

  if (status.pedOpened) {
    return 0.45;
  }

  return 0;
}

function isPedOpening(rawState: string): boolean {
  return rawState.trim().toLowerCase() === "pedopening";
}

function buildWingTransform(
  side: "left" | "right",
  openness: number,
  pivotX: number,
  pivotY: number
): string {
  const t = clamp(openness, 0, 1);

  const minScale = 0.035;
  const scaleX = Math.max(minScale, Math.cos((t * Math.PI) / 2));
  const skew = (side === "left" ? -1 : 1) * t * 7.5;

  return [
    `translate(${pivotX} ${pivotY})`,
    `skewX(${skew})`,
    `scale(${scaleX} 1)`,
    `translate(${-pivotX} ${-pivotY})`,
  ].join(" ");
}

export function renderGateSvg(status: GateStatus, pedestrianSide: PedestrianSide) {
  const openRatio = getOpenRatio(status);
  const pedestrianOpening = pedestrianSide !== false && status.moving && isPedOpening(status.rawState);
  const pedestrianOpened = pedestrianSide !== false && status.pedOpened;

  const pedestrianActive = pedestrianOpening || pedestrianOpened;
  const pedestrianRatio = openRatio > 0 ? openRatio : 0.45;

  const leftRatio = pedestrianActive
    ? pedestrianSide === "left"
      ? pedestrianRatio
      : 0
    : openRatio;

  const rightRatio = pedestrianActive
    ? pedestrianSide === "right"
      ? pedestrianRatio
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
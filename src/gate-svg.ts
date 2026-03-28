import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { GATE_SVG } from "./gate-art";
import type { GateStatus } from "./types";

export function renderGateSvg(_status: GateStatus) {
  return html`
    <div class="gate-svg-wrap">
      ${unsafeHTML(GATE_SVG)}
    </div>
  `;
}
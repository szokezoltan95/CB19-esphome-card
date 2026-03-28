import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import type { Cb19GateCardConfig, GateEntities, GateStatus } from "./types";
import { buildEntities } from "./utils/entities";
import { computeGateStatus } from "./utils/state";
import { renderGateSvg } from "./gate-svg";

@customElement("cb19-gate-card")
export class Cb19GateCard extends LitElement {
  @property({ attribute: false }) public hass: any;
  @state() private _config?: Cb19GateCardConfig;

  static styles = [cardStyles];

  public setConfig(config: Cb19GateCardConfig): void {
    if (!config.controller) {
      throw new Error("Missing required option: controller");
    }

    this._config = {
      title: "Gate",
      show_controls: true,
      show_status: true,
      show_debug: false,
      ...config,
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      rows: 2,
      columns: 12,
      min_rows: 2,
    };
  }

  private get _entities(): GateEntities | null {
    if (!this._config) {
      return null;
    }
    return buildEntities(this._config);
  }

  private _pressButton(entityId: string): void {
    if (!this.hass || !entityId) {
      return;
    }

    this.hass.callService("button", "press", {
      entity_id: entityId,
    });
  }

  private _renderFlags(status: GateStatus) {
    const flags = [];

    if (status.photocell) {
      flags.push(html`
        <div class="flag warn">
          <ha-icon icon="mdi:laser"></ha-icon>
          <span>Photocell</span>
        </div>
      `);
    }

    if (status.obstruction) {
      flags.push(html`
        <div class="flag error">
          <ha-icon icon="mdi:alert-octagon"></ha-icon>
          <span>Obstruction</span>
        </div>
      `);
    }

    if (status.manualStop) {
      flags.push(html`
        <div class="flag">
          <ha-icon icon="mdi:hand-back-right"></ha-icon>
          <span>Stopped</span>
        </div>
      `);
    }

    return html`
      <div class="flags-row">
        ${flags.length ? flags : nothing}
      </div>
    `;
  }

  private _renderMeta(status: GateStatus) {
    const positionText =
      status.position === null ? "–" : `${status.position.toFixed(0)}%`;

    return html`
      <div class="meta-row">
        <div class="meta-state">${status.label}</div>
        <div class="meta-separator">•</div>
        <div class="meta-position">${positionText}</div>
      </div>
    `;
  }

  private _renderControls(entities: GateEntities) {
    return html`
      <div class="controls">
        <button
          class="icon-btn primary"
          title="Open"
          @click=${() => this._pressButton(entities.openButton)}
        >
          <ha-icon icon="mdi:gate-open"></ha-icon>
        </button>

        <button
          class="icon-btn warn"
          title="Stop"
          @click=${() => this._pressButton(entities.stopButton)}
        >
          <ha-icon icon="mdi:stop"></ha-icon>
        </button>

        <button
          class="icon-btn primary"
          title="Close"
          @click=${() => this._pressButton(entities.closeButton)}
        >
          <ha-icon icon="mdi:gate"></ha-icon>
        </button>

        <button
          class="icon-btn"
          title="Pedestrian Open"
          @click=${() => this._pressButton(entities.pedestrianButton)}
        >
          <ha-icon icon="mdi:walk"></ha-icon>
        </button>
      </div>
    `;
  }

  private _renderDebug(entities: GateEntities, status: GateStatus) {
    return html`
      <div class="debug-box">
        <div><strong>Controller:</strong> ${this._config?.controller}</div>
        <div><strong>Gate state entity:</strong> ${entities.gateState}</div>
        <div><strong>Gate position entity:</strong> ${entities.gatePosition}</div>
        <div><strong>Last ACK:</strong> ${status.lastAck || "-"}</div>
        <div><strong>Raw state:</strong> ${status.rawState || "-"}</div>
      </div>
    `;
  }

  protected render() {
    if (!this._config) {
      return html``;
    }

    const entities = this._entities;
    if (!entities) {
      return html``;
    }

    const status = computeGateStatus(this.hass, entities);

    return html`
      <ha-card>
        <div class="wrapper">
          ${this._renderFlags(status)}

          <div class="visual-box">
            ${renderGateSvg(status)}
          </div>

          ${this._config.show_status ? this._renderMeta(status) : nothing}
          ${this._config.show_controls ? this._renderControls(entities) : nothing}
          ${this._config.show_debug ? this._renderDebug(entities, status) : nothing}
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cb19-gate-card": Cb19GateCard;
  }
}
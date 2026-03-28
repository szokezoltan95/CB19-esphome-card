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
    return 4;
  }

  public getGridOptions() {
    return {
      rows: 4,
      columns: 6,
      min_rows: 4,
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

  private _renderStatus(status: GateStatus) {
    const positionText =
      status.position === null ? "Unknown" : `${status.position.toFixed(0)}%`;

    return html`
      <div class="status-grid">
        <div class="status-item">
          <div class="status-label">Position</div>
          <div class="status-value">${positionText}</div>
        </div>

        <div class="status-item">
          <div class="status-label">State</div>
          <div class="status-value">${status.label}</div>
        </div>

        <div class="status-item">
          <div class="status-label">Photocell</div>
          <div class="status-value">${status.photocell ? "Active" : "Idle"}</div>
        </div>

        <div class="status-item">
          <div class="status-label">Obstruction</div>
          <div class="status-value">${status.obstruction ? "Detected" : "None"}</div>
        </div>
      </div>
    `;
  }

  private _renderControls(entities: GateEntities) {
    return html`
      <div class="controls">
        <button
          class="control-btn"
          @click=${() => this._pressButton(entities.openButton)}
        >
          Open
        </button>

        <button
          class="control-btn secondary"
          @click=${() => this._pressButton(entities.pedestrianButton)}
        >
          Pedestrian
        </button>

        <button
          class="control-btn secondary"
          @click=${() => this._pressButton(entities.closeButton)}
        >
          Close
        </button>

        <button
          class="control-btn warn"
          @click=${() => this._pressButton(entities.stopButton)}
        >
          Stop
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
    const title = this._config.title || "Gate";

    return html`
      <ha-card>
        <div class="wrapper">
          <div class="header-row">
            <div class="title">${title}</div>
            <div class="state-badge">${status.label}</div>
          </div>

          <div class="visual-box">
            ${renderGateSvg(status)}
          </div>

          ${this._config.show_status ? this._renderStatus(status) : nothing}
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
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

    const motor1Side =
      config.motor1_side === "right" ? "right" : "left";

    const settingsAction =
      config.settings_action === false
        ? false
        : config.settings_action === "more_info"
          ? "more_info"
          : "device_page";

    this._config = {
      title: "Gate",
      show_controls: true,
      show_status: true,
      show_debug: false,
      motor1_side: motor1Side,
      settings_action: settingsAction,
      ...config,
    };
  }
  public getCardSize(): number {
    return this._config?.show_debug ? 5 : 3;
  }

  public getGridOptions() {
    const rows = this._config?.show_debug ? 5 : 3;

    return {
      rows,
      min_rows: rows,
      max_rows: rows,
      columns: 12,
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

  private _renderControls(entities: GateEntities, status: GateStatus) {
    const showPedestrian = status.pedestrianEnabled;

    return html`
      <div
        class="controls"
        style=${showPedestrian
          ? "grid-template-columns: repeat(4, minmax(0, 1fr));"
          : "grid-template-columns: repeat(3, minmax(0, 1fr));"}
      >
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

        ${showPedestrian
          ? html`
              <button
                class="icon-btn"
                title="Pedestrian Open"
                @click=${() => this._pressButton(entities.pedestrianButton)}
              >
                <ha-icon icon="mdi:walk"></ha-icon>
              </button>
            `
          : nothing}
      </div>
    `;
  }

private async _openSettings(entities: GateEntities): Promise<void> {
  if (!this._config || !this.hass) {
    return;
  }

  const action = this._config.settings_action;
  if (action === false) {
    return;
  }

  // 👉 melyik entity legyen a device lookup alapja
  const deviceEntity =
    this._config.settings_device_entity ||
    entities.openButton; // EZ A LÉNYEG → mindig működik

  // 👉 melyik entity legyen more-info fallback
  const moreInfoEntity =
    this._config.settings_entity ||
    entities.pedestrianMode;

  // --- MORE INFO mód ---
  if (action === "more_info") {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: moreInfoEntity },
      })
    );
    return;
  }

  // --- DEVICE PAGE mód ---
  try {
    const registry = await this.hass.callWS({
      type: "config/entity_registry/get",
    });

    const entry = registry.find(
      (e: any) => e.entity_id === deviceEntity
    );

    if (entry?.device_id) {
      window.history.pushState(
        null,
        "",
        `/config/devices/device/${entry.device_id}`
      );
      window.dispatchEvent(new Event("location-changed"));
      return;
    }
  } catch (err) {
    console.warn("Device lookup failed", err);
  }

  // --- fallback ---
  this.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId: moreInfoEntity },
    })
  );
}

  private _renderTopRow(entities: GateEntities) {
    if (this._config?.settings_action === false) {
      return html`<div class="top-row"></div>`;
    }

    return html`
      <div class="top-row">
        <button
          class="settings-btn"
          title="Settings"
          @click=${() => this._openSettings(entities)}
        >
          <ha-icon icon="mdi:cog"></ha-icon>
        </button>
      </div>
    `;
  }

  private _renderDebug(entities: GateEntities, status: GateStatus) {
    return html`
      <div class="debug-box">
        <div><strong>Controller:</strong> ${this._config?.controller}</div>
        <div><strong>Motor1 side:</strong> ${this._config?.motor1_side}</div>
        <div><strong>Gate state entity:</strong> ${entities.gateState}</div>
        <div><strong>Gate position entity:</strong> ${entities.gatePosition}</div>
        <div><strong>Motor1 position entity:</strong> ${entities.motor1Position}</div>
        <div><strong>Motor2 position entity:</strong> ${entities.motor2Position}</div>
        <div><strong>Pedestrian mode entity:</strong> ${entities.pedestrianMode}</div>
        <div><strong>Pedestrian enabled:</strong> ${status.pedestrianEnabled ? "yes" : "no"}</div>
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
          ${this._renderTopRow(entities)}
          ${this._renderFlags(status)}

          <div class="visual-box">
            ${renderGateSvg(status, this._config?.motor1_side ?? "left")}
          </div>

          ${this._config.show_status ? this._renderMeta(status) : nothing}
          ${this._config.show_controls ? this._renderControls(entities, status) : nothing}
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
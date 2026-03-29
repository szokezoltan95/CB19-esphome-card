import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import type {
  ActiveEffect,
  AvailableActions,
  CardUiConfig,
  Cb19GateCardConfig,
  ControlName,
  GateEntities,
  GateStatus,
} from "./types";
import { buildEntities } from "./utils/entities";
import { computeAvailableActions, computeGateStatus } from "./utils/state";
import { renderGateSvg } from "./gate-svg";
import { resolveUiConfig } from "./utils/ui-config";

@customElement("cb19-gate-card")
export class Cb19GateCard extends LitElement {
  @property({ attribute: false }) public hass: any;
  @state() private _config?: Cb19GateCardConfig;
  @state() private _ui: CardUiConfig = resolveUiConfig({
    type: "custom:cb19-gate-card",
    controller: "cb19_gate",
  });

  static styles = [cardStyles];

  public setConfig(config: Cb19GateCardConfig): void {
    if (!config.controller) {
      throw new Error("Missing required option: controller");
    }

    const motor1Side = config.motor1_side === "right" ? "right" : "left";

    this._config = {
      show_debug: false,
      settings_action: "device_page",
      motor1_side: motor1Side,
      ...config,
    };

    this._ui = resolveUiConfig(this._config);
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: "full",
      min_columns: 3,
    };
  }

  private get _entities(): GateEntities | null {
    if (!this._config) {
      return null;
    }
    return buildEntities(this._config);
  }

  private _wrapperStyle() {
    return [
      `--cb19-card-padding: ${this._ui.padding.card}`,
      `--cb19-visual-padding: ${this._ui.padding.visual}`,
      `--cb19-controls-top: ${this._ui.padding.controls_top}`,
      `--cb19-header-bottom: ${this._ui.padding.header_bottom}`,
      `--cb19-content-gap: ${this._ui.padding.content_gap}`,
    ].join("; ");
  }

  private _pressButton(entityId: string): void {
    if (!this.hass || !entityId) {
      return;
    }

    this.hass.callService("button", "press", {
      entity_id: entityId,
    });
  }

  private _formatPercent(value: number | null): string {
    return value === null ? "–" : `${value.toFixed(0)}%`;
  }

  private _buttonStyle(action: ControlName): string {
    const t = this._ui.icon_tune;

    const x =
      (t.x ?? 0) +
      (action === "open"
        ? t.open_x
        : action === "stop"
          ? t.stop_x
          : action === "close"
            ? t.close_x
            : t.pedestrian_x);

    const y =
      (t.y ?? 0) +
      (action === "open"
        ? t.open_y
        : action === "stop"
          ? t.stop_y
          : action === "close"
            ? t.close_y
            : t.pedestrian_y);

    return [
      `--cb19-icon-default-color: ${this._ui.colors.icon_default[action]}`,
      `--cb19-active-color: ${this._ui.colors.icon_active[action]}`,
      `--cb19-available-color: ${this._ui.colors.icon_available[action]}`,
      `--cb19-icon-x: ${x}px`,
      `--cb19-icon-y: ${y}px`,
    ].join("; ");
  }

  private _buttonClasses(
    action: ControlName,
    active: boolean,
    available: boolean
  ): string {
    const classes = ["icon-btn", action];

    if (available) {
      classes.push("is-available");
      if (this._ui.controls.available_action_tint) {
        classes.push("tint-enabled");
      }
    }

    if (active) {
      classes.push("is-active");
      const effect = this._ui.effects.active_action as ActiveEffect;
      classes.push(`effect-${effect}`);
    }

    return classes.join(" ");
  }

  private _renderSettingsButton(entities: GateEntities) {
    const headerWantsButton =
      this._ui.header.enabled &&
      this._ui.header.settings_button_position === "header";
    const graphicWantsButton =
      !this._ui.header.enabled ||
      this._ui.header.settings_button_position === "graphic";

    if (!this._ui.settings_button.enabled || this._config?.settings_action === false) {
      return nothing;
    }

    return {
      header: headerWantsButton
        ? html`
            <button
              class="settings-btn"
              title="Settings"
              @click=${() => this._openSettings(entities)}
            >
              <ha-icon icon="mdi:cog"></ha-icon>
            </button>
          `
        : nothing,
      graphic: graphicWantsButton
        ? html`
            <button
              class="settings-btn"
              title="Settings"
              @click=${() => this._openSettings(entities)}
            >
              <ha-icon icon="mdi:cog"></ha-icon>
            </button>
          `
        : nothing,
    };
  }

  private _renderHeader(status: GateStatus, entities: GateEntities) {
    if (!this._ui.header.enabled) {
      return nothing;
    }

    const settings = this._renderSettingsButton(entities) as {
      header: unknown;
      graphic: unknown;
    };

    return html`
      <div class="header-row">
        <div class="header-main">
          <div class="header-title">${this._ui.header.title}</div>
          <div class="header-meta">
            ${this._ui.header.show_state
              ? html`<span>${status.label}</span>`
              : nothing}
            ${this._ui.header.show_state && this._ui.header.show_position
              ? html`<span>•</span>`
              : nothing}
            ${this._ui.header.show_position
              ? html`<span>${this._formatPercent(status.position)}</span>`
              : nothing}
          </div>
        </div>
        ${settings.header as any}
      </div>
    `;
  }

  private _renderOverlayFlags(status: GateStatus) {
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

    if (!flags.length) {
      return nothing;
    }

    return html`
      <div class="overlay-badges">
        <div class="overlay-badges-inner">
          ${flags}
        </div>
      </div>
    `;
  }

  private _renderMeta(status: GateStatus) {
    return html`
      <div class="meta-row">
        <div class="meta-state">${status.label}</div>
        <div class="meta-separator">•</div>
        <div class="meta-position">${this._formatPercent(status.position)}</div>
      </div>
    `;
  }

  private _renderTextPanel(status: GateStatus) {
    return html`
      <div class="text-panel">
        <div class="text-panel-main">${status.label}</div>
        <div class="text-panel-sub">
          Position: ${this._formatPercent(status.position)} · M1:
          ${this._formatPercent(status.motor1Position)} · M2:
          ${this._formatPercent(status.motor2Position)}
        </div>
      </div>
    `;
  }

  private _renderControls(
    entities: GateEntities,
    status: GateStatus,
    available: AvailableActions
  ) {
    if (!this._ui.controls.enabled) {
      return nothing;
    }

    const rawState = status.rawState.trim().toLowerCase();

    const openActive = status.moving && rawState === "opening";
    const closeActive = status.moving && rawState === "closing";
    const pedActive = status.moving && rawState === "pedopening";
    const stopActive = status.moving || status.manualStop || status.obstruction;

    const showPedestrian =
      this._ui.controls.show_pedestrian === "auto"
        ? status.pedestrianEnabled
        : !!this._ui.controls.show_pedestrian;

    const visibleCount = [
      this._ui.controls.show_open,
      this._ui.controls.show_stop,
      this._ui.controls.show_close,
      showPedestrian,
    ].filter(Boolean).length;

    return html`
      <div class="controls-wrap">
        <div
          class="controls"
          style=${`grid-template-columns: repeat(${visibleCount}, minmax(0, 1fr));`}
        >
          ${this._ui.controls.show_open
            ? html`
                <button
                  class=${this._buttonClasses(
                    "open",
                    openActive,
                    available.open
                  )}
                  style=${this._buttonStyle("open")}
                  title="Open"
                  @click=${() => this._pressButton(entities.openButton)}
                >
                  <ha-icon icon=${this._ui.icons.open}></ha-icon>
                </button>
              `
            : nothing}

          ${this._ui.controls.show_stop
            ? html`
                <button
                  class=${this._buttonClasses(
                    "stop",
                    stopActive,
                    available.stop
                  )}
                  style=${this._buttonStyle("stop")}
                  title="Stop"
                  @click=${() => this._pressButton(entities.stopButton)}
                >
                  <ha-icon icon=${this._ui.icons.stop}></ha-icon>
                </button>
              `
            : nothing}

          ${this._ui.controls.show_close
            ? html`
                <button
                  class=${this._buttonClasses(
                    "close",
                    closeActive,
                    available.close
                  )}
                  style=${this._buttonStyle("close")}
                  title="Close"
                  @click=${() => this._pressButton(entities.closeButton)}
                >
                  <ha-icon icon=${this._ui.icons.close}></ha-icon>
                </button>
              `
            : nothing}

          ${showPedestrian
            ? html`
                <button
                  class=${this._buttonClasses(
                    "pedestrian",
                    pedActive,
                    available.pedestrian
                  )}
                  style=${this._buttonStyle("pedestrian")}
                  title="Pedestrian Open"
                  @click=${() => this._pressButton(entities.pedestrianButton)}
                >
                  <ha-icon icon=${this._ui.icons.pedestrian}></ha-icon>
                </button>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderDebug(entities: GateEntities, status: GateStatus) {
    return html`
      <div class="debug-box">
        <div><strong>Controller:</strong> ${this._config?.controller}</div>
        <div><strong>Motor1 side:</strong> ${this._config?.motor1_side}</div>
        <div><strong>View mode:</strong> ${this._ui.view_mode}</div>
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

  private _openSettings(entities: GateEntities): void {
    if (!this._config || !this.hass) {
      return;
    }

    const action = this._config.settings_action;
    if (action === false) {
      return;
    }

    if (this._config.settings_path) {
      window.history.pushState(null, "", this._config.settings_path);
      window.dispatchEvent(new Event("location-changed"));
      return;
    }

    if (action === "more_info") {
      const entityId =
        this._config.settings_entity ||
        entities.pedestrianMode;

      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId },
        })
      );
      return;
    }

    console.warn(
      "CB19 Gate Card: settings_action is device_page, but no settings_path is configured."
    );
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
    const available = computeAvailableActions(status);
    const settings = this._renderSettingsButton(entities) as {
      header: unknown;
      graphic: unknown;
    };

    return html`
      <ha-card>
        <div class="wrapper" style=${this._wrapperStyle()}>
          ${this._renderHeader(status, entities)}

          ${this._ui.view_mode === "text"
            ? this._renderTextPanel(status)
            : html`
                <div class="visual-box">
                  ${renderGateSvg(status, this._config.motor1_side ?? "left")}
                  ${this._renderOverlayFlags(status)}
                  ${settings.graphic as any}
                </div>
                ${this._ui.view_mode !== "graphic"
                  ? this._renderMeta(status)
                  : this._renderMeta(status)}
              `}

          ${this._renderControls(entities, status, available)}
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
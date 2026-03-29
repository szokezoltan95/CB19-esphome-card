import type { CardUiConfig, Cb19GateCardConfig } from "../types";

export const DEFAULT_UI_CONFIG: CardUiConfig = {
  view_mode: "graphic",

  header: {
    enabled: false,
    title: "Gate",
    show_state: true,
    show_position: true,
    settings_button_position: "graphic",
  },

  settings_button: {
    enabled: true,
  },

  controls: {
    enabled: true,
    show_open: true,
    show_stop: true,
    show_close: true,
    show_pedestrian: "auto",
    available_action_tint: true,
  },

  icons: {
    open: "mdi:arrow-expand-horizontal",
    stop: "mdi:stop",
    close: "mdi:arrow-collapse-horizontal",
    pedestrian: "mdi:walk",
  },

  icon_tune: {
    x: -3,
    y: -3,
    open_x: 0,
    open_y: 0,
    stop_x: 0,
    stop_y: 0,
    close_x: 0,
    close_y: 0,
    pedestrian_x: 0,
    pedestrian_y: 0,
  },

  colors: {
    button_default: {
      open: "var(--secondary-background-color)",
      stop: "var(--secondary-background-color)",
      close: "var(--secondary-background-color)",
      pedestrian: "var(--secondary-background-color)",
    },
    button_active: {
      open: "color-mix(in srgb, #22c55e 18%, var(--secondary-background-color))",
      stop: "color-mix(in srgb, #ef4444 18%, var(--secondary-background-color))",
      close: "color-mix(in srgb, #f59e0b 18%, var(--secondary-background-color))",
      pedestrian: "color-mix(in srgb, #3b82f6 18%, var(--secondary-background-color))",
    },
    button_available: {
      open: "color-mix(in srgb, #16a34a 12%, var(--secondary-background-color))",
      stop: "color-mix(in srgb, #dc2626 12%, var(--secondary-background-color))",
      close: "color-mix(in srgb, #d97706 12%, var(--secondary-background-color))",
      pedestrian: "color-mix(in srgb, #2563eb 12%, var(--secondary-background-color))",
    },
    icon_default: {
      open: "#ffffff",
      stop: "#ffffff",
      close: "#ffffff",
      pedestrian: "#ffffff",
    },
    icon_active: {
      open: "#ffffff",
      stop: "#ffffff",
      close: "#ffffff",
      pedestrian: "#ffffff",
    },
    icon_available: {
      open: "#ffffff",
      stop: "#ffffff",
      close: "#ffffff",
      pedestrian: "#ffffff",
    },
  },

  effects: {
    active_action: "pulse",
  },

  padding: {
    card: "8px 10px 8px",
    visual: "10px 14px 6px",
    controls_top: "2px",
    header_bottom: "4px",
    content_gap: "6px",
  },
};

export function resolveUiConfig(config: Cb19GateCardConfig): CardUiConfig {
  const ui = config.ui ?? {};

  return {
    view_mode: ui.view_mode ?? DEFAULT_UI_CONFIG.view_mode,

    header: {
      enabled: ui.header?.enabled ?? DEFAULT_UI_CONFIG.header.enabled,
      title: ui.header?.title ?? DEFAULT_UI_CONFIG.header.title,
      show_state:
        ui.header?.show_state ?? DEFAULT_UI_CONFIG.header.show_state,
      show_position:
        ui.header?.show_position ?? DEFAULT_UI_CONFIG.header.show_position,
      settings_button_position:
        ui.header?.settings_button_position ??
        DEFAULT_UI_CONFIG.header.settings_button_position,
    },

    settings_button: {
      enabled:
        ui.settings_button?.enabled ??
        DEFAULT_UI_CONFIG.settings_button.enabled,
    },

    controls: {
      enabled: ui.controls?.enabled ?? DEFAULT_UI_CONFIG.controls.enabled,
      show_open:
        ui.controls?.show_open ?? DEFAULT_UI_CONFIG.controls.show_open,
      show_stop:
        ui.controls?.show_stop ?? DEFAULT_UI_CONFIG.controls.show_stop,
      show_close:
        ui.controls?.show_close ?? DEFAULT_UI_CONFIG.controls.show_close,
      show_pedestrian:
        ui.controls?.show_pedestrian ??
        DEFAULT_UI_CONFIG.controls.show_pedestrian,
      available_action_tint:
        ui.controls?.available_action_tint ??
        DEFAULT_UI_CONFIG.controls.available_action_tint,
    },

    icons: {
      open: ui.icons?.open ?? DEFAULT_UI_CONFIG.icons.open,
      stop: ui.icons?.stop ?? DEFAULT_UI_CONFIG.icons.stop,
      close: ui.icons?.close ?? DEFAULT_UI_CONFIG.icons.close,
      pedestrian:
        ui.icons?.pedestrian ?? DEFAULT_UI_CONFIG.icons.pedestrian,
    },

    icon_tune: {
      x: ui.icon_tune?.x ?? DEFAULT_UI_CONFIG.icon_tune.x,
      y: ui.icon_tune?.y ?? DEFAULT_UI_CONFIG.icon_tune.y,
      open_x: ui.icon_tune?.open_x ?? DEFAULT_UI_CONFIG.icon_tune.open_x,
      open_y: ui.icon_tune?.open_y ?? DEFAULT_UI_CONFIG.icon_tune.open_y,
      stop_x: ui.icon_tune?.stop_x ?? DEFAULT_UI_CONFIG.icon_tune.stop_x,
      stop_y: ui.icon_tune?.stop_y ?? DEFAULT_UI_CONFIG.icon_tune.stop_y,
      close_x:
        ui.icon_tune?.close_x ?? DEFAULT_UI_CONFIG.icon_tune.close_x,
      close_y:
        ui.icon_tune?.close_y ?? DEFAULT_UI_CONFIG.icon_tune.close_y,
      pedestrian_x:
        ui.icon_tune?.pedestrian_x ??
        DEFAULT_UI_CONFIG.icon_tune.pedestrian_x,
      pedestrian_y:
        ui.icon_tune?.pedestrian_y ??
        DEFAULT_UI_CONFIG.icon_tune.pedestrian_y,
    },

    colors: {
      button_default: {
        ...DEFAULT_UI_CONFIG.colors.button_default,
        ...(ui.colors?.button_default ?? {}),
      },
      button_active: {
        ...DEFAULT_UI_CONFIG.colors.button_active,
        ...(ui.colors?.button_active ?? {}),
      },
      button_available: {
        ...DEFAULT_UI_CONFIG.colors.button_available,
        ...(ui.colors?.button_available ?? {}),
      },
      icon_default: {
        ...DEFAULT_UI_CONFIG.colors.icon_default,
        ...(ui.colors?.icon_default ?? {}),
      },
      icon_active: {
        ...DEFAULT_UI_CONFIG.colors.icon_active,
        ...(ui.colors?.icon_active ?? {}),
      },
      icon_available: {
        ...DEFAULT_UI_CONFIG.colors.icon_available,
        ...(ui.colors?.icon_available ?? {}),
      },
    },

    effects: {
      active_action:
        ui.effects?.active_action ?? DEFAULT_UI_CONFIG.effects.active_action,
    },

    padding: {
      card: ui.padding?.card ?? DEFAULT_UI_CONFIG.padding.card,
      visual: ui.padding?.visual ?? DEFAULT_UI_CONFIG.padding.visual,
      controls_top:
        ui.padding?.controls_top ?? DEFAULT_UI_CONFIG.padding.controls_top,
      header_bottom:
        ui.padding?.header_bottom ?? DEFAULT_UI_CONFIG.padding.header_bottom,
      content_gap:
        ui.padding?.content_gap ?? DEFAULT_UI_CONFIG.padding.content_gap,
    },
  };
}
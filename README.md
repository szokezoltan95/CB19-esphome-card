# CB19 ESPHome Card 🚀

[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz)
[![Version](https://img.shields.io/github/v/release/szokezoltan95/CB19-esphome-card)](https://github.com/szokezoltan95/CB19-esphome-card/releases)

A highly configurable Home Assistant Lovelace card for controlling and visualizing a dual-wing gate driven by a custom CB19 ESPHome firmware.

---

## ⚠️ Compatibility

This card works **ONLY** with:

https://github.com/szokezoltan95/CB19-esphome  

❌ Not compatible with stock CB19 or generic ESPHome setups.

---

## ✨ Features

- Dual motor animated wings
- Fully configurable UI
- Active action animations
- Available action highlighting
- Pedestrian mode support
- Overlay warnings
- Multiple layouts
- Pixel-perfect tuning

---

## 📦 Installation

### HACS
Add custom repo:
https://github.com/szokezoltan95/CB19-esphome-card

### Manual
Copy:
dist/cb19-esphome-card.js → /config/www/

---

## 🧩 Basic Usage

```yaml
type: custom:cb19-esphome-card
controller: cb19_gate
```

---

## ⚙️ ALL CONFIG OPTIONS (FULL TABLE)

| Key | Example | Description |
|-----|--------|------------|
| controller | cb19_gate | ESPHome prefix |
| motor1_side | left | Motor1 side |

| ui.view_mode | graphic | graphic / text / hybrid |

| ui.header.enabled | true | Show header |
| ui.header.title | Main Gate | Title |
| ui.header.show_state | true | Show state |
| ui.header.show_position | true | Show % |
| ui.header.settings_button_position | header | header / graphic / none |

| ui.controls.enabled | true | Enable controls |
| ui.controls.show_open | true | Show open |
| ui.controls.show_stop | true | Show stop |
| ui.controls.show_close | true | Show close |
| ui.controls.show_pedestrian | auto | auto / true / false |
| ui.controls.available_action_tint | true | Highlight available |

| ui.icons.open | mdi:arrow-expand-horizontal | Icon |
| ui.icons.stop | mdi:stop | Icon |
| ui.icons.close | mdi:arrow-collapse-horizontal | Icon |
| ui.icons.pedestrian | mdi:walk | Icon |

| ui.icon_tune.x | 0 | Global offset |
| ui.icon_tune.y | 0 | Global offset |
| ui.icon_tune.open_x | 0 | Offset |
| ui.icon_tune.open_y | 0 | Offset |
| ui.icon_tune.stop_x | 0 | Offset |
| ui.icon_tune.stop_y | 0 | Offset |
| ui.icon_tune.close_x | 0 | Offset |
| ui.icon_tune.close_y | 0 | Offset |
| ui.icon_tune.pedestrian_x | 0 | Offset |
| ui.icon_tune.pedestrian_y | 0 | Offset |

| ui.colors.icon_default | #ccc | Default color |
| ui.colors.icon_active | #22c55e | Active color |
| ui.colors.icon_available | #16a34a | Available color |

| ui.effects.active_action | pulse | none / pulse / blink / glow |

| ui.padding.card | "8px" | Outer padding |
| ui.padding.visual | "10px" | Graphic padding |
| ui.padding.controls_top | "2px" | Controls gap |
| ui.padding.header_bottom | "4px" | Header gap |
| ui.padding.content_gap | "6px" | Internal spacing |

---

## 🧪 Preset Configs

### Minimal

```yaml
type: custom:cb19-esphome-card
controller: cb19_gate

ui:
  view_mode: text
  header:
    enabled: false
```

---

### Clean Tablet UI

```yaml
ui:
  view_mode: hybrid
  controls:
    available_action_tint: true
  effects:
    active_action: pulse
```

---

### Fancy Animated

```yaml
ui:
  effects:
    active_action: glow
  colors:
    icon_active:
      open: "#22c55e"
      close: "#f97316"
```

---

## ⚙️ Settings Button

Get device path from:

Settings → Devices → ESPHome → Device page

---

## 🧪 Debug

```yaml
show_debug: true
```

---

## 🛠️ Development

```bash
npm install
npm run build
```

---

## 👨‍💻 Author

Zoltán Szőke

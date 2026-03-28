# CB19 ESPHome Card

A compact, animated Home Assistant Lovelace card for a dual-wing CB19 gate controller running a **custom ESPHome firmware**.

This card is built for a very specific ecosystem: it visualizes the decoded motor positions, gate state, safety signals, and control buttons exposed by my custom CB19 ESPHome component, then turns them into a compact wall-dashboard friendly control panel.

---

## Important Compatibility Notice

This card is **not** a generic CB19 card.

It is designed to work properly **only** with this ESPHome project:

**CB19-esphome**  
<https://github.com/szokezoltan95/CB19-esphome>

And currently, it is intended to work with the **`experimental`** branch of that repository.

### What this means

This card depends on:

- specific entity names
- decoded motor position sensors
- decoded gate state values
- custom binary sensors
- custom select / button entities

Because of that, the card will **not** behave correctly with:

- stock CB19 controllers
- random ESPHome YAMLs for CB19
- other unofficial integrations
- older or different branches of the ESPHome project

If the required entities are missing or named differently, the animation, status display, pedestrian mode handling, and controls may break or show wrong information.

---

## What the Card Does

The card provides a compact gate control interface with:

- animated left and right gate wings
- separate per-wing animation based on Motor1 and Motor2 positions
- open / stop / close / pedestrian buttons
- live gate status and position display
- safety overlays for obstruction and photocell
- a settings shortcut button

The goal is to fit cleanly into a tablet dashboard without wasting vertical space.

---

## How the Animation Works

The two gate wings are animated **independently**.

That means the card does **not** simply animate both wings from one shared global gate percentage. Instead, each side is driven from its own motor position sensor.

### Used motor position sensors

- `sensor.<controller>_motor1_position`
- `sensor.<controller>_motor2_position`

### Why this matters

This allows the card to correctly show:

- slight timing differences between wings
- real pedestrian opening behavior
- asymmetric movement if one wing starts or finishes earlier
- a more realistic gate animation overall

---

## Motor Mapping

The card needs to know which side belongs to **Motor1**.

This is configured using:

```yaml
motor1_side: left
```

or

```yaml
motor1_side: right
```

### Mapping table

| Config value | Left wing uses | Right wing uses |
|---|---|---|
| `motor1_side: left` | Motor1 | Motor2 |
| `motor1_side: right` | Motor2 | Motor1 |

### Pedestrian mode

Pedestrian opening always uses **Motor1**.

So:

- if `motor1_side: left`, pedestrian opening affects the **left** wing
- if `motor1_side: right`, pedestrian opening affects the **right** wing

---

## Status Logic

The card does not rely only on one text sensor. It combines multiple signals to determine what to show.

### Primary status sources

These binary sensors take priority when determining the visible status:

- `binary_sensor.<controller>_fully_closed`
- `binary_sensor.<controller>_fully_opened`
- `binary_sensor.<controller>_manual_stop`
- `binary_sensor.<controller>_obstruction`
- `binary_sensor.<controller>_ped_opened`
- `binary_sensor.<controller>_photocell`

### Moving state

Only when:

- `binary_sensor.<controller>_moving` is `on`

the card looks at:

- `sensor.<controller>_gate_state`

to determine whether the operation is currently:

- Opening
- Closing
- Ped Opening

This makes the status display more robust and prevents the UI from depending too heavily on just one text state.

---

## Pedestrian Button Visibility

The pedestrian button is **not** shown only because of dashboard config.  
It follows the controller configuration exposed by ESPHome.

The card checks:

- `select.<controller>_fc_pedestrian_mode`

Expected values include:

- `FC-0 | Disabled`
- `FC-1 | Enabled (default)`

### Behavior

- if pedestrian mode is disabled, the pedestrian button is hidden
- if pedestrian mode is enabled, the button appears automatically

---

## Safety Indicators

The card can show warning overlays directly on top of the gate graphic.

### Overlay badges

When active, these appear over the gate itself:

- **Photocell**
- **Obstruction**

This is intentionally designed as an in-place blocking indicator instead of a detached status label, because both of these states represent conditions that directly affect gate movement.

---

## Settings Button

The settings button is designed to open the **Home Assistant device page** for the CB19 ESPHome device.

The most reliable approach is to provide the device page path manually.

### Recommended config

```yaml
settings_action: device_page
settings_path: /config/devices/device/0123456789abcdef0123456789abcdef
```

### How to find the correct `settings_path`

1. Open **Settings**
2. Open **Devices & Services**
3. Open the **ESPHome** integration
4. Open your specific **CB19 gate controller** device
5. Copy the page path from the browser address bar

It will look similar to:

```text
/config/devices/device/0123456789abcdef0123456789abcdef
```

Then place that value into the card config.

This is currently the most stable solution.

---

## Installation

### HACS installation

1. Open **HACS**
2. Go to **Frontend**
3. Open the menu and choose **Custom repositories**
4. Add this repository:

```text
https://github.com/szokezoltan95/CB19-esphome-card
```

5. Select repository type:

```text
Dashboard
```

6. Install the card
7. Refresh Home Assistant

---

### Manual installation

1. Copy the built file:

```text
dist/cb19-esphome-card.js
```

to your Home Assistant `www` folder, for example:

```text
/config/www/cb19-esphome-card.js
```

2. Add it as a Lovelace resource:

```yaml
lovelace:
  resources:
    - url: /local/cb19-esphome-card.js
      type: module
```

3. Reload Home Assistant

---

## Required ESPHome Project

This card is expected to be used together with:

**Repository:**  
<https://github.com/szokezoltan95/CB19-esphome>

**Branch:**  
`experimental`

The card expects that project to expose the matching entities.

---

## Expected Entities

The exact list may evolve, but the card is built around entities such as:

### Sensors

- `sensor.<controller>_gate_position`
- `sensor.<controller>_motor1_position`
- `sensor.<controller>_motor2_position`
- `sensor.<controller>_gate_state`
- `sensor.<controller>_last_ack`

### Binary sensors

- `binary_sensor.<controller>_moving`
- `binary_sensor.<controller>_fully_opened`
- `binary_sensor.<controller>_fully_closed`
- `binary_sensor.<controller>_ped_opened`
- `binary_sensor.<controller>_manual_stop`
- `binary_sensor.<controller>_photocell`
- `binary_sensor.<controller>_obstruction`

### Selects

- `select.<controller>_fc_pedestrian_mode`

### Buttons

- `button.<controller>_open`
- `button.<controller>_close`
- `button.<controller>_stop`
- `button.<controller>_pedestrian_open`

If these entities are not present, or if they are named differently, you will need overrides or code changes.

---

## Basic Dashboard Configuration

Minimal example:

```yaml
type: custom:cb19-gate-card
controller: cb19_gate
motor1_side: left
settings_action: device_page
settings_path: /config/devices/device/0123456789abcdef0123456789abcdef
```

---

## Configuration Options

| Option | Required | Default | Description |
|---|---|---|---|
| `controller` | Yes | – | ESPHome device/entity prefix, for example `cb19_gate` |
| `motor1_side` | No | `left` | Which visual wing corresponds to Motor1 |
| `show_controls` | No | `true` | Show Open / Stop / Close / Pedestrian buttons |
| `show_status` | No | `true` | Show compact status text and gate percentage |
| `show_debug` | No | `false` | Show extra debugging information |
| `settings_action` | No | `device_page` | Settings button behavior |
| `settings_path` | No | – | Direct Home Assistant device page path |
| `entities` | No | – | Optional manual entity overrides |

---

## Example Configurations

### Standard setup with Motor1 on the left

```yaml
type: custom:cb19-gate-card
controller: cb19_gate
motor1_side: left
settings_action: device_page
settings_path: /config/devices/device/0123456789abcdef0123456789abcdef
```

### Standard setup with Motor1 on the right

```yaml
type: custom:cb19-gate-card
controller: cb19_gate
motor1_side: right
settings_action: device_page
settings_path: /config/devices/device/0123456789abcdef0123456789abcdef
```

### Debugging layout

```yaml
type: custom:cb19-gate-card
controller: cb19_gate
motor1_side: left
show_debug: true
settings_action: device_page
settings_path: /config/devices/device/0123456789abcdef0123456789abcdef
```

---

## Manual Entity Overrides

If needed, entity IDs can be overridden in the config.

Example:

```yaml
type: custom:cb19-gate-card
controller: cb19_gate
motor1_side: left
entities:
  motor1_position: sensor.my_gate_motor1_position
  motor2_position: sensor.my_gate_motor2_position
  gate_state: sensor.my_gate_gate_state
  pedestrian_mode: select.my_gate_fc_pedestrian_mode
```

This is mainly useful if your entity IDs differ from the default naming pattern.

---

## UI Layout Notes

The card is intentionally designed to stay compact:

- the gate graphic is the visual center
- status text is directly below the graphic
- controls are in a single compact row
- obstruction and photocell are rendered as overlays
- the settings button is placed over the graphic area to save vertical space

This makes the card especially suitable for wall tablets and dense dashboard layouts.

---

## Development

Install dependencies:

```bash
npm install
```

Build the card:

```bash
npm run build
```

After building, commit the generated `dist` file as well if you want HACS to load the latest version directly from the repository.

---

## Common Problems

### The card loads, but animation is wrong

Usually caused by one of these:

- wrong `motor1_side`
- incompatible ESPHome branch
- missing or incorrect motor position sensors

### The pedestrian button does not appear

Check:

- `select.<controller>_fc_pedestrian_mode`

If it is disabled, the button is intentionally hidden.

### The settings button does not open the correct page

Use a direct `settings_path` copied from the Home Assistant device page.

### The card shows wrong or missing states

Make sure you are using the expected entity set from the `experimental` branch of the custom ESPHome project.

---

## Project Scope

This repository contains only the **frontend card**.

The actual controller logic, entity creation, UART decoding, and parameter handling live in the separate ESPHome repository:

<https://github.com/szokezoltan95/CB19-esphome>

---

## License

MIT

---

## Author

Zoltán Szőke

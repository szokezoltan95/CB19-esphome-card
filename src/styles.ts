import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ha-card {
    display: block;
    overflow: hidden;
    border-radius: 16px;
  }

  .wrapper {
    position: relative;
    display: grid;
    gap: var(--cb19-content-gap, 6px);
    padding: var(--cb19-card-padding, 8px 10px 8px);
    width: 100%;
    isolation: isolate;
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: var(--cb19-header-bottom, 4px);
  }

  .header-main {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .header-title {
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 16px;
    font-size: 0.76rem;
    line-height: 1;
    color: var(--secondary-text-color);
    flex-wrap: wrap;
  }

  .visual-box {
    position: relative;
    width: 100%;
    min-height: 88px;
    padding: var(--cb19-visual-padding, 10px 14px 6px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .gate-svg-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gate-svg {
    display: block;
    width: 100%;
    max-width: none;
    height: auto;
    max-height: 96px;
  }

  .overlay-badges {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay-badges-inner {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 80%;
  }

  .flag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 999px;
    font-size: 0.72rem;
    line-height: 1;
    font-weight: 600;
    white-space: nowrap;
    backdrop-filter: blur(4px);
  }

  .flag.warn {
    background: color-mix(
      in srgb,
      var(--warning-color, #ff9800) 22%,
      var(--card-background-color)
    );
    color: var(--warning-color, #ff9800);
  }

  .flag.error {
    background: color-mix(
      in srgb,
      var(--error-color) 22%,
      var(--card-background-color)
    );
    color: var(--error-color);
  }

  .settings-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 5;
    appearance: none;
    border: none;
    background: none;
    color: var(--secondary-text-color);
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.12s ease, transform 0.12s ease;
  }

  .settings-btn:hover {
    color: var(--primary-text-color);
    transform: scale(1.08);
  }

  .settings-btn ha-icon {
    width: 20px;
    height: 20px;
    display: block;
  }

  .meta-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 18px;
    font-size: 0.82rem;
    line-height: 1;
  }

  .meta-state {
    font-weight: 600;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  .meta-separator {
    color: var(--secondary-text-color);
  }

  .meta-position {
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .text-panel {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .text-panel-main {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-text-color);
  }

  .text-panel-sub {
    font-size: 0.82rem;
    color: var(--secondary-text-color);
    line-height: 1.35;
  }

  .controls-wrap {
    margin-top: var(--cb19-controls-top, 2px);
  }

  .controls {
    display: grid;
    gap: 8px;
  }

.icon-btn {
  position: relative;
  appearance: none;
  border: none;
  border-radius: 10px;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: var(--cb19-button-default-bg, var(--secondary-background-color));
  color: var(--cb19-icon-default-color, var(--primary-text-color));
  transition:
    transform 0.08s ease,
    background 0.12s ease,
    filter 0.12s ease,
    color 0.12s ease,
    box-shadow 0.12s ease;
}

  .icon-btn:hover {
    filter: brightness(1.06);
  }

  .icon-btn:active {
    filter: brightness(0.94);
    transform: scale(0.97);
  }

  .icon-btn ha-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    transform: translate(
      calc(-50% + var(--cb19-icon-x, 0px)),
      calc(-50% + var(--cb19-icon-y, 0px))
    );
  }

  .icon-btn {
    color: var(--cb19-icon-default-color, var(--primary-text-color));
  }

.icon-btn.is-available.tint-enabled {
  background: var(--cb19-button-available-bg, var(--secondary-background-color));
  color: var(--cb19-icon-available-color, var(--cb19-icon-default-color, var(--primary-text-color)));
}

.icon-btn.is-active {
  background: var(--cb19-button-active-bg, var(--secondary-background-color));
  color: var(--cb19-icon-active-color, var(--cb19-icon-default-color, var(--primary-text-color)));
}

.icon-btn.is-active.effect-pulse {
  animation: button-pulse 1.25s ease-in-out infinite;
}

.icon-btn.is-active.effect-blink {
  animation: button-blink 1s steps(2, start) infinite;
}

.icon-btn.is-active.effect-glow {
  box-shadow: 0 0 0 1px
      color-mix(in srgb, var(--cb19-active-color, #3b82f6) 35%, transparent),
    0 0 12px
      color-mix(in srgb, var(--cb19-active-color, #3b82f6) 28%, transparent);
}

.icon-btn.is-available:not(.is-active) {
  animation: none !important;
  box-shadow: none;
}

  @keyframes button-pulse {
    0% {
      filter: brightness(0.95);
    }
    50% {
      filter: brightness(1.18);
    }
    100% {
      filter: brightness(0.95);
    }
  }

  @keyframes button-blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.55;
    }
    100% {
      opacity: 1;
    }
  }

  .debug-box {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 10px 12px;
    font-size: 0.78rem;
    line-height: 1.45;
    word-break: break-word;
    margin-top: 2px;
  }
`;
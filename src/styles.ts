import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    border-radius: 16px;
  }

  .wrapper {
    display: grid;
    grid-template-rows: auto auto auto auto;
    gap: 8px;
    padding: 10px 12px 10px;
  }

  .flags-row {
    min-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .flag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.72rem;
    line-height: 1;
    font-weight: 600;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .flag.warn {
    background: color-mix(in srgb, var(--warning-color, #ff9800) 18%, transparent);
    color: var(--warning-color, #ff9800);
  }

  .flag.error {
    background: color-mix(in srgb, var(--error-color) 18%, transparent);
    color: var(--error-color);
  }

  .visual-box {
    width: 100%;
    min-height: 96px;
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
    max-height: 120px;
  }

  .meta-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 20px;
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

  .controls {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  .icon-btn {
    appearance: none;
    border: none;
    border-radius: 12px;
    min-height: 40px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.12s ease, background 0.12s ease;
  }

  .icon-btn:hover {
    transform: translateY(-1px);
  }

  .icon-btn:active {
    transform: translateY(0);
  }

  .icon-btn.primary {
    background: color-mix(in srgb, var(--primary-color) 16%, var(--card-background-color));
    color: var(--primary-color);
  }

  .icon-btn.warn {
    background: color-mix(in srgb, var(--error-color) 16%, var(--card-background-color));
    color: var(--error-color);
  }

  ha-icon {
    width: 20px;
    height: 20px;
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
  
  .gate-svg #left-wing-group,
  .gate-svg #right-wing-group {
    transform-box: fill-box;
    transform-origin: center;
  }
`;
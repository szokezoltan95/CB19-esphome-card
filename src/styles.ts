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
    display: grid;
    grid-template-rows: auto auto auto;
    gap: 6px;
    padding: 8px 10px 8px;
    width: 100%;
  }

  .visual-box {
    position: relative;
    width: 100%;
    min-height: 88px;

    padding: 15px 12px 2px;

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
    height: auto;
    max-height: 104px;
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
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
  }

  .flag.warn {
    background: color-mix(in srgb, var(--warning-color, #ff9800) 22%, var(--card-background-color));
    color: var(--warning-color, #ff9800);
  }

  .flag.error {
    background: color-mix(in srgb, var(--error-color) 22%, var(--card-background-color));
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

  .controls {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  .icon-btn {
    appearance: none;
    border: none;
    border-radius: 12px;
    min-height: 38px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    color: #ffffff; /* ← minden ikon fehér */

    transition:
      transform 0.12s ease,
      filter 0.12s ease,
      box-shadow 0.12s ease;
  }

  .icon-btn.open {
    background: #22c55e;
    box-shadow: 0 2px 6px rgba(34, 197, 94, 0.35);
  }

  .icon-btn.stop {
    background: #ef4444;
    box-shadow: 0 2px 6px rgba(239, 68, 68, 0.35);
  }

  .icon-btn.close {
    background: #f59e0b; /* narancs */
    box-shadow: 0 2px 6px rgba(245, 158, 11, 0.35);
  }

  .icon-btn.ped {
    background: #3b82f6; /* kék */
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.35);
  }

  .icon-btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }

  .icon-btn:active {
    transform: translateY(0);
    filter: brightness(0.95);
  }

  .icon-btn ha-icon {
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
`;
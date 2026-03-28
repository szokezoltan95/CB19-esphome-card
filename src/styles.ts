import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .state-badge {
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    background: var(--secondary-background-color);
  }

  .visual-box {
    min-height: 220px;
    border-radius: 16px;
    background: var(--secondary-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    overflow: hidden;
  }

  .placeholder-gate {
    width: 100%;
    max-width: 420px;
    height: 120px;
    border-radius: 12px;
    border: 2px dashed var(--divider-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
    font-size: 0.95rem;
    text-align: center;
    padding: 16px;
  }

  .status-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .status-item {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 10px 12px;
  }

  .status-label {
    font-size: 0.78rem;
    color: var(--secondary-text-color);
    margin-bottom: 4px;
  }

  .status-value {
    font-size: 0.95rem;
    font-weight: 600;
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  button.control-btn {
    border: none;
    border-radius: 14px;
    padding: 12px 14px;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    background: var(--primary-color);
    color: var(--text-primary-color, white);
  }

  button.control-btn.secondary {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }

  button.control-btn.warn {
    background: var(--error-color);
    color: white;
  }

  .debug-box {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 12px;
    font-size: 0.84rem;
    line-height: 1.5;
    word-break: break-word;
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
    max-width: 640px;
    height: auto;
  }
`;
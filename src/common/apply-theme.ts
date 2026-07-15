// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { applyTheme } from '@cloudscape-design/components/theming';

import * as localStorage from './local-storage';

export type ThemeChoice = 'light' | 'dark' | 'cyberpunk' | 'terminal' | 'dracula';

const STORAGE_KEY = 'Awsui-Theme-Preference';

let resetOverride: (() => void) | undefined;

const cyberpunkTokens = {
  colorBackgroundLayoutMain: '#0a0014',
  colorBackgroundContainerContent: '#120524',
  colorBackgroundContainerHeader: '#170a2e',
  colorBackgroundLayoutPanel: '#0a0014',
  colorTextHeadingDefault: '#00f0ff',
  colorTextBodyDefault: '#e8e8ff',
  colorTextLinkDefault: '#ff00e6',
  colorTextAccent: '#00f0ff',
  colorBackgroundButtonPrimaryDefault: '#ff00e6',
  colorBorderButtonPrimaryDefault: '#00f0ff',
  colorTextButtonPrimaryDefault: '#0a0014',
  colorBorderDividerDefault: '#2f1a4d',
  colorBorderItemFocused: '#00f0ff',
  colorBorderInputFocused: '#00f0ff',
  borderRadiusContainer: '4px',
  borderRadiusInput: '4px',
};

// Retro green-phosphor CRT terminal look
const terminalTokens = {
  colorBackgroundLayoutMain: '#000000',
  colorBackgroundContainerContent: '#001a00',
  colorBackgroundContainerHeader: '#002200',
  colorBackgroundLayoutPanel: '#000000',
  colorTextHeadingDefault: '#00ff41',
  colorTextBodyDefault: '#33ff33',
  colorTextLinkDefault: '#00ff41',
  colorTextAccent: '#00ff41',
  colorBackgroundButtonPrimaryDefault: '#003300',
  colorBorderButtonPrimaryDefault: '#00ff41',
  colorTextButtonPrimaryDefault: '#00ff41',
  colorBorderDividerDefault: '#004400',
  colorBorderItemFocused: '#00ff41',
  colorBorderInputFocused: '#00ff41',
  borderRadiusContainer: '0px',
  borderRadiusInput: '0px',
  // Categorical 2 and 5 are lightened from earlier drafts (#0b6623/#1b3d1f) which fell to
  // ~2.6:1 and ~1.5:1 contrast against the dark container background, below the 3:1 minimum
  // WCAG 1.4.11 requires for graphical objects like chart fills.
  colorChartsPaletteCategorical1: '#39ff14',
  colorChartsPaletteCategorical2: '#1f9e4d',
  colorChartsPaletteCategorical3: '#a6ff9e',
  colorChartsPaletteCategorical4: '#00994d',
  colorChartsPaletteCategorical5: '#128a3f',
  colorChartsPaletteCategorical6: '#5ddc7c',
  colorChartsStatusPositive: '#39ff14',
  colorChartsStatusInfo: '#5ddc7c',
  colorChartsStatusNeutral: '#1f9e4d',
  colorChartsThresholdInfo: '#adff2f',
  colorChartsThresholdPositive: '#adff2f',
  colorChartsThresholdNeutral: '#adff2f',
  colorChartsErrorBarMarker: '#00ff41',
};

// Dracula IDE palette (https://draculatheme.com)
const draculaTokens = {
  colorBackgroundLayoutMain: '#282a36',
  colorBackgroundContainerContent: '#282a36',
  colorBackgroundContainerHeader: '#21222c',
  colorBackgroundLayoutPanel: '#21222c',
  colorTextHeadingDefault: '#bd93f9',
  colorTextBodyDefault: '#f8f8f2',
  colorTextLinkDefault: '#8be9fd',
  colorTextAccent: '#ff79c6',
  colorBackgroundButtonPrimaryDefault: '#bd93f9',
  colorBorderButtonPrimaryDefault: '#ff79c6',
  colorTextButtonPrimaryDefault: '#282a36',
  colorBorderDividerDefault: '#44475a',
  colorBorderItemFocused: '#8be9fd',
  colorBorderInputFocused: '#8be9fd',
};

const themeTokens: Partial<Record<ThemeChoice, Record<string, string>>> = {
  cyberpunk: cyberpunkTokens,
  terminal: terminalTokens,
  dracula: draculaTokens,
};

export function getInitialThemeChoice(): ThemeChoice {
  return localStorage.load<ThemeChoice>(STORAGE_KEY) ?? 'light';
}

export function setThemeChoice(choice: ThemeChoice) {
  if (resetOverride) {
    resetOverride();
    resetOverride = undefined;
  }

  applyMode(choice === 'light' ? Mode.Light : Mode.Dark);

  const tokens = themeTokens[choice];
  if (tokens) {
    const { reset } = applyTheme({ theme: { tokens } });
    resetOverride = reset;
  }

  localStorage.save(STORAGE_KEY, choice);
}

setThemeChoice(getInitialThemeChoice());

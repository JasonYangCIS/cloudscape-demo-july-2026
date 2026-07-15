// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { applyTheme } from '@cloudscape-design/components/theming';

import * as localStorage from './local-storage';

export type ThemeChoice = 'light' | 'dark' | 'cyberpunk';

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

export function getInitialThemeChoice(): ThemeChoice {
  return localStorage.load<ThemeChoice>(STORAGE_KEY) ?? 'light';
}

export function setThemeChoice(choice: ThemeChoice) {
  if (resetOverride) {
    resetOverride();
    resetOverride = undefined;
  }

  applyMode(choice === 'light' ? Mode.Light : Mode.Dark);

  if (choice === 'cyberpunk') {
    const { reset } = applyTheme({ theme: { tokens: cyberpunkTokens } });
    resetOverride = reset;
  }

  localStorage.save(STORAGE_KEY, choice);
}

setThemeChoice(getInitialThemeChoice());

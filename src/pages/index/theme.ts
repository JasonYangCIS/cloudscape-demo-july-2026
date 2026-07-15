// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { applyTheme as applyRuntimeTheme, Theme } from '@cloudscape-design/components/theming';

import * as localStorage from '../../common/local-storage';

export type AppTheme = 'light' | 'dark' | 'creative';

const THEME_STORAGE_KEY = 'Awsui-App-Theme-Preference';

export const creativeTheme: Theme = {
  tokens: {
    colorBackgroundButtonPrimaryDefault: '#ff2e88',
    colorBackgroundButtonPrimaryHover: '#ff5fa8',
    colorTextLinkDefault: '#00f0ff',
    colorTextAccent: '#00f0ff',
    colorBackgroundContainerHeader: '#1a1030',
    shadowCard: '0 0 12px rgba(255,46,136,0.35)',
    borderRadiusButton: '2px',
    borderRadiusContainer: '4px',
    borderRadiusInput: '2px',
    colorChartsPaletteCategorical1: '#39ff14',
    colorChartsPaletteCategorical2: '#ff2e88',
    colorChartsThresholdNeutral: '#00f0ff',
    fontFamilyHeading: '{fontFamilyMonospace}',
    fontFamilyDisplay: '{fontFamilyMonospace}',
  },
};

let activeReset: (() => void) | undefined;

export function applyAppTheme(theme: AppTheme) {
  activeReset?.();
  activeReset = undefined;

  applyMode(theme === 'light' ? Mode.Light : Mode.Dark);

  if (theme === 'creative') {
    activeReset = applyRuntimeTheme({ theme: creativeTheme }).reset;
  }

  localStorage.save(THEME_STORAGE_KEY, theme);
}

export function getInitialAppTheme(): AppTheme {
  return localStorage.load<AppTheme>(THEME_STORAGE_KEY) ?? 'light';
}

applyAppTheme(getInitialAppTheme());

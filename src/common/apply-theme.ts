// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { applyTheme as applyCustomTheme, Theme } from '@cloudscape-design/components/theming';

import * as localStorage from './local-storage';

export type ThemeChoice = 'light' | 'dark' | 'creative';

const creativeTheme: Theme = {
  tokens: {
    fontFamilyBase: '"Poppins", "Helvetica Neue", Roboto, Arial, sans-serif',
    fontFamilyDisplay: '"Poppins", "Helvetica Neue", Roboto, Arial, sans-serif',
    fontFamilyHeading: '"Poppins", "Helvetica Neue", Roboto, Arial, sans-serif',
    borderRadiusButton: '20px',
    borderRadiusContainer: '20px',
    borderRadiusInput: '12px',
    borderRadiusItem: '12px',
    borderRadiusBadge: '999px',
    borderRadiusTiles: '16px',
    colorBackgroundLayoutMain: '#f4effc',
    colorBackgroundContainerContent: '#ffffff',
    colorTextAccent: '#7c3aed',
    colorTextLinkDefault: '#7c3aed',
    colorBackgroundButtonPrimaryDefault: '#7c3aed',
    colorBackgroundButtonPrimaryHover: '#6d28d9',
    colorBackgroundButtonPrimaryActive: '#5b21b6',
    colorTextButtonPrimaryDefault: '#ffffff',
    colorTextButtonPrimaryHover: '#ffffff',
    colorTextButtonPrimaryActive: '#ffffff',
    colorBackgroundButtonNormalDefault: '#f3e8ff',
    colorBackgroundButtonNormalHover: '#e9d5ff',
    colorBackgroundButtonNormalActive: '#d8b4fe',
    colorChartsPaletteCategorical1: '#7c3aed',
    colorChartsPaletteCategorical2: '#ec4899',
    colorChartsPaletteCategorical3: '#f59e0b',
    colorChartsPaletteCategorical4: '#10b981',
    colorChartsPaletteCategorical5: '#3b82f6',
  },
};

let activeCustomTheme: { reset: () => void } | null = null;

export let currentTheme: ThemeChoice = localStorage.load<ThemeChoice>('Awsui-Theme-Preference') ?? 'light';

function apply(theme: ThemeChoice) {
  if (activeCustomTheme) {
    activeCustomTheme.reset();
    activeCustomTheme = null;
  }

  switch (theme) {
    case 'dark':
      applyMode(Mode.Dark);
      break;
    case 'creative':
      applyMode(Mode.Light);
      activeCustomTheme = applyCustomTheme({ theme: creativeTheme });
      break;
    case 'light':
    default:
      applyMode(Mode.Light);
      break;
  }
}

apply(currentTheme);

export function updateTheme(theme: ThemeChoice) {
  apply(theme);
  localStorage.save('Awsui-Theme-Preference', theme);
  currentTheme = theme;
}

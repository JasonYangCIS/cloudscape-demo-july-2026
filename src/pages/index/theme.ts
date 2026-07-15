// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { applyTheme as applyCustomTheme, ApplyThemeResult } from '@cloudscape-design/components/theming';

export type ThemeId = 'light' | 'dark' | 'creative';

export const THEME_OPTIONS: ReadonlyArray<{ id: ThemeId; text: string; iconName: 'status-info' | 'light-dark' | 'suggestions' }> = [
  { id: 'light', text: 'Light', iconName: 'status-info' },
  { id: 'dark', text: 'Dark', iconName: 'light-dark' },
  { id: 'creative', text: 'Creative', iconName: 'suggestions' },
];

const creativeTheme = {
  tokens: {
    colorBackgroundButtonPrimaryDefault: '#7c3aed',
    colorBackgroundButtonPrimaryHover: '#6d28d9',
    colorBackgroundButtonPrimaryActive: '#5b21b6',
    colorBorderButtonPrimaryDefault: '#7c3aed',
    colorTextAccent: '#ff6b6b',
    colorTextLinkDefault: '#7c3aed',
    colorTextHeadingDefault: '#5b21b6',
    colorBackgroundLayoutMain: '#faf5ff',
    colorChartsPaletteCategorical1: '#7c3aed',
    colorChartsPaletteCategorical2: '#ff6b6b',
    colorChartsPaletteCategorical3: '#22d3ee',
    colorChartsPaletteCategorical4: '#fbbf24',
    colorChartsPaletteCategorical5: '#34d399',
    borderRadiusButton: '20px',
    borderRadiusContainer: '16px',
    borderRadiusCardDefault: '16px',
    borderRadiusInput: '12px',
    borderRadiusDropdown: '12px',
    fontFamilyHeading: "'Poppins', sans-serif",
    fontFamilyDisplay: "'Poppins', sans-serif",
    shadowCard: '0 8px 24px rgba(124, 58, 237, 0.16)',
  },
};

let activeCustomTheme: ApplyThemeResult | undefined;

export function applyDashboardTheme(themeId: ThemeId) {
  activeCustomTheme?.reset();
  activeCustomTheme = undefined;

  if (themeId === 'dark') {
    applyMode(Mode.Dark);
    return;
  }

  applyMode(Mode.Light);
  if (themeId === 'creative') {
    activeCustomTheme = applyCustomTheme({ theme: creativeTheme });
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { MutableRefObject } from 'react';

import { applyTheme, ApplyThemeResult } from '@cloudscape-design/components/theming';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

export type ThemeId = 'light' | 'dark' | 'creative';

export const THEME_STORAGE_KEY = 'Awsui-Theme-Preference';

export const creativeTheme = {
  tokens: {
    fontFamilyBase: '"Poppins", "Trebuchet MS", sans-serif',
    fontFamilyHeading: '"Poppins", "Trebuchet MS", sans-serif',
    colorBackgroundLayoutMain: '#fdf2ff',
    colorBackgroundContainerContent: '#ffffff',
    colorBackgroundContainerHeader: '#f3e8ff',
    colorTextHeadingDefault: '#7c3aed',
    colorTextAccent: '#ec4899',
    colorTextLinkDefault: '#ec4899',
    colorBackgroundButtonPrimaryDefault: '#ec4899',
    colorBackgroundButtonPrimaryHover: '#db2777',
    colorBackgroundButtonPrimaryActive: '#be185d',
    colorBorderButtonPrimaryDefault: '#ec4899',
    colorBorderButtonPrimaryHover: '#db2777',
    colorBorderButtonPrimaryActive: '#be185d',
    borderRadiusButton: '20px',
    borderRadiusContainer: '16px',
    borderRadiusInput: '12px',
    borderRadiusCardDefault: '16px',
    colorChartsPaletteCategorical1: '#ec4899',
    colorChartsPaletteCategorical2: '#7c3aed',
    colorChartsPaletteCategorical3: '#06b6d4',
    colorChartsPaletteCategorical4: '#f59e0b',
    colorChartsPaletteCategorical5: '#10b981',
  },
};

export function applyThemeId(themeId: ThemeId, resetRef: MutableRefObject<ApplyThemeResult | undefined>) {
  resetRef.current?.reset();
  resetRef.current = undefined;

  applyMode(themeId === 'dark' ? Mode.Dark : Mode.Light);

  if (themeId === 'creative') {
    resetRef.current = applyTheme({ theme: creativeTheme });
  }
}

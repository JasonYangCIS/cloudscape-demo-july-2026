// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyTheme as applyRuntimeTheme, ApplyThemeResult } from '@cloudscape-design/components/theming';
import { applyMode as applyColorMode, Mode } from '@cloudscape-design/global-styles';

export type ThemeId = 'light' | 'dark' | 'creative';

const creativeTheme = {
  tokens: {
    colorBackgroundLayoutMain: '{colorGrey900}',
    colorBackgroundContainerHeader: '{colorGrey900}',
    colorBackgroundButtonPrimaryDefault: '#c9a15a',
    colorBorderButtonPrimaryDefault: '#c9a15a',
    colorTextAccent: '#c9a15a',
    colorTextLinkDefault: '#c9a15a',
    fontFamilyHeading: '"Playfair Display", Georgia, serif',
    fontFamilyDisplay: '"Playfair Display", Georgia, serif',
    borderRadiusContainer: '12px',
    borderRadiusButton: '20px',
    borderRadiusInput: '8px',
    shadowCard: '0 8px 24px rgba(15, 27, 42, 0.35)',
    colorChartsPaletteCategorical1: '#c9a15a',
    colorChartsPaletteCategorical2: '#5a7fc9',
  },
};

let resetRuntimeTheme: ApplyThemeResult['reset'] | undefined;

export function applyThemeChoice(themeId: ThemeId) {
  resetRuntimeTheme?.();
  resetRuntimeTheme = undefined;
  applyColorMode(Mode.Light);

  if (themeId === 'dark') {
    applyColorMode(Mode.Dark);
  } else if (themeId === 'creative') {
    resetRuntimeTheme = applyRuntimeTheme({ theme: creativeTheme }).reset;
  }
}

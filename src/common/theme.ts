// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { applyTheme, Theme } from '@cloudscape-design/components/theming';

import * as localStorage from './local-storage';

export type ThemeId = 'light' | 'dark' | 'creative';

export const THEME_STORAGE_KEY = 'Awsui-Theme-Preference';
const CREATIVE_FONTS_LINK_ID = 'creative-theme-fonts';

export const THEME_OPTIONS: { value: ThemeId; label: string; description: string }[] = [
  { value: 'light', label: 'Light', description: 'The default look and feel.' },
  { value: 'dark', label: 'Dark', description: "Cloudscape's built-in dark mode." },
  { value: 'creative', label: 'Creative', description: 'A bold, colorful, playful look.' },
];

export const creativeTheme: Theme = {
  tokens: {
    colorBackgroundLayoutMain: '#fdf3ff',
    colorBackgroundContainerContent: '#fff3fb',
    colorBackgroundButtonPrimaryDefault: '#ff3d81',
    colorBackgroundButtonPrimaryHover: '#e91e78',
    colorBackgroundButtonPrimaryActive: '#c2185b',
    colorBorderButtonPrimaryDefault: '#ff3d81',
    colorTextButtonPrimaryDefault: '#ffffff',
    colorTextAccent: '#00b8a9',
    colorTextHeadingDefault: '#3d2465',
    colorTextLinkDefault: '#00b8a9',
    colorTextLinkHover: '#008577',
    colorBorderDividerDefault: '#f0c1e1',
    colorBorderItemFocused: '#ffb703',
    colorChartsPaletteCategorical1: '#ff3d81',
    colorChartsPaletteCategorical2: '#00b8a9',
    colorChartsPaletteCategorical3: '#ffb703',
    colorChartsPaletteCategorical4: '#7c4dff',
    colorChartsPaletteCategorical5: '#ff7043',
    colorChartsPaletteCategorical6: '#3ddc97',
    colorChartsPaletteCategorical7: '#5c6bc0',
    colorChartsPaletteCategorical8: '#f06292',
    borderRadiusButton: '999px',
    borderRadiusContainer: '24px',
    borderRadiusInput: '999px',
    borderRadiusPopover: '24px',
    borderRadiusDropdown: '24px',
    borderRadiusBadge: '999px',
    borderRadiusStatusIndicator: '999px',
    fontFamilyHeading: '"Baloo 2", cursive, sans-serif',
    fontFamilyDisplay: '"Baloo 2", cursive, sans-serif',
    fontFamilyBase: '"Space Grotesk", sans-serif',
    spaceButtonHorizontal: '24px',
    spaceButtonVertical: '14px',
    spaceCardHorizontalDefault: '28px',
    spaceCardVerticalDefault: '28px',
    spaceCardHorizontalEmbedded: '24px',
    spaceCardVerticalEmbedded: '24px',
    spaceFieldVertical: '12px',
    spaceAlertVertical: '20px',
    spaceTabsVertical: '16px',
    spaceTokenVertical: '10px',
    shadowCard: '0 8px 24px rgba(124, 77, 255, 0.25)',
  },
};

let resetCreativeTheme: (() => void) | null = null;

function loadCreativeFonts() {
  if (document.getElementById(CREATIVE_FONTS_LINK_ID)) {
    return;
  }
  const link = document.createElement('link');
  link.id = CREATIVE_FONTS_LINK_ID;
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700&family=Space+Grotesk:wght@400;500&display=swap';
  document.head.appendChild(link);
}

export function applyThemeId(themeId: ThemeId, options: { persist?: boolean } = {}) {
  if (resetCreativeTheme) {
    resetCreativeTheme();
    resetCreativeTheme = null;
  }
  applyMode(themeId === 'dark' ? Mode.Dark : Mode.Light, document.body);
  if (themeId === 'creative') {
    loadCreativeFonts();
    resetCreativeTheme = applyTheme({ theme: creativeTheme }).reset;
  }
  if (options.persist !== false) {
    localStorage.save(THEME_STORAGE_KEY, themeId);
  }
}

export function loadThemeId(): ThemeId {
  return localStorage.load<ThemeId>(THEME_STORAGE_KEY) ?? 'light';
}

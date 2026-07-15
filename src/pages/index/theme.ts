// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useEffect, useState } from 'react';

import { applyTheme, Theme } from '@cloudscape-design/components/theming';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

import * as localStorage from '../../common/local-storage';

export type ThemeName = 'light' | 'dark' | 'creative';

export const THEME_OPTIONS: { value: ThemeName; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'creative', label: 'Creative' },
];

const CREATIVE_FONT_FAMILY = "'Poppins', 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif";
const CREATIVE_FONT_STYLESHEET_ID = 'creative-theme-font';

export const CREATIVE_THEME: Theme = {
  tokens: {
    colorBackgroundLayoutMain: '#fdf2ff',
    colorBackgroundContainerContent: '#fffaf0',
    colorTextAccent: '#c026d3',
    colorTextHeadingDefault: '#701a75',
    colorBackgroundButtonPrimaryDefault: '#c026d3',
    colorBackgroundButtonPrimaryHover: '#a21caf',
    colorBackgroundButtonPrimaryActive: '#86198f',
    colorBorderButtonPrimaryDefault: '#c026d3',
    borderRadiusButton: '20px',
    borderRadiusContainer: '24px',
    borderRadiusInput: '20px',
    borderRadiusItem: '16px',
    fontFamilyBase: CREATIVE_FONT_FAMILY,
  },
};

const STORAGE_KEY = 'Awsui-Theme-Preference';

let resetCreativeTheme: (() => void) | undefined;

function setCreativeFontLoaded(loaded: boolean) {
  const existing = document.getElementById(CREATIVE_FONT_STYLESHEET_ID);
  if (loaded && !existing) {
    const link = document.createElement('link');
    link.id = CREATIVE_FONT_STYLESHEET_ID;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
    document.head.appendChild(link);
  } else if (!loaded && existing) {
    existing.remove();
  }
}

export function applyThemeName(name: ThemeName) {
  applyMode(name === 'dark' ? Mode.Dark : Mode.Light);

  if (resetCreativeTheme) {
    resetCreativeTheme();
    resetCreativeTheme = undefined;
  }
  setCreativeFontLoaded(false);

  if (name === 'creative') {
    resetCreativeTheme = applyTheme({ theme: CREATIVE_THEME }).reset;
    setCreativeFontLoaded(true);
  }
}

export function useThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>(() => localStorage.load<ThemeName>(STORAGE_KEY) ?? 'light');

  useEffect(() => {
    applyThemeName(theme);
    localStorage.save(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme };
}

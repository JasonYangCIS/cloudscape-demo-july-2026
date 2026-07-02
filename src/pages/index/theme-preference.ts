// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { applyTheme } from '@cloudscape-design/components/theming';

import * as localStorage from '../../common/local-storage';

export type ThemeName = 'light' | 'dark' | 'creative';

const STORAGE_KEY = 'Awsui-Theme-Preference';

const CREATIVE_THEME = {
  tokens: {
    colorBackgroundButtonPrimaryDefault: '#a512d6',
    colorBackgroundButtonPrimaryHover: '#8c0fb5',
    colorBackgroundButtonPrimaryActive: '#730c94',
    colorBorderButtonPrimaryDefault: '#a512d6',
    colorBorderButtonPrimaryHover: '#8c0fb5',
    colorBorderButtonPrimaryActive: '#730c94',
    colorTextAccent: '#a512d6',
    colorTextLinkDefault: '#d6249f',
    colorTextHeadingDefault: '#5b0a8c',
    fontFamilyBase: "'Poppins', 'Helvetica Neue', Roboto, Arial, sans-serif",
    fontFamilyHeading: "'Poppins', 'Helvetica Neue', Roboto, Arial, sans-serif",
    borderRadiusContainer: '20px',
    borderRadiusButton: '20px',
    borderRadiusInput: '16px',
    borderRadiusDropdown: '16px',
    colorChartsPaletteCategorical1: '#a512d6',
    colorChartsPaletteCategorical2: '#ff6f61',
    colorChartsPaletteCategorical3: '#ffb703',
    colorChartsPaletteCategorical4: '#06d6a0',
    colorChartsPaletteCategorical5: '#118ab2',
    colorChartsPaletteCategorical6: '#d6249f',
    colorChartsPaletteCategorical7: '#f72585',
    colorChartsPaletteCategorical8: '#3a86ff',
  },
};

let resetCreativeTheme: (() => void) | undefined;

function clearCreativeTheme() {
  resetCreativeTheme?.();
  resetCreativeTheme = undefined;
}

export function applyThemeName(name: ThemeName) {
  clearCreativeTheme();

  if (name === 'dark') {
    applyMode(Mode.Dark);
  } else if (name === 'creative') {
    applyMode(Mode.Light);
    resetCreativeTheme = applyTheme({ theme: CREATIVE_THEME }).reset;
  } else {
    applyMode(Mode.Light);
  }
}

export function updateThemePreference(name: ThemeName) {
  applyThemeName(name);
  localStorage.save(STORAGE_KEY, name);
  currentThemePreference = name;
}

export let currentThemePreference: ThemeName = localStorage.load<ThemeName>(STORAGE_KEY) ?? 'light';
applyThemeName(currentThemePreference);

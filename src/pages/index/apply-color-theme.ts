// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { applyTheme } from '@cloudscape-design/components/theming';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

import { creativeTheme } from './creative-theme';

export type ColorThemeName = 'light' | 'dark' | 'creative';

export const COLOR_THEME_OPTIONS: ReadonlyArray<{ id: ColorThemeName; text: string }> = [
  { id: 'light', text: 'Light' },
  { id: 'dark', text: 'Dark' },
  { id: 'creative', text: 'Creative' },
];

let resetCreativeTheme: (() => void) | null = null;

export function applyColorTheme(themeName: ColorThemeName) {
  if (resetCreativeTheme) {
    resetCreativeTheme();
    resetCreativeTheme = null;
  }

  if (themeName === 'creative') {
    applyMode(Mode.Light);
    resetCreativeTheme = applyTheme({ theme: creativeTheme }).reset;
  } else {
    applyMode(themeName === 'dark' ? Mode.Dark : Mode.Light);
  }
}

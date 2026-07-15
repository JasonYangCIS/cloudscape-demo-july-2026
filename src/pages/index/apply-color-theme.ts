// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Mode, applyMode } from '@cloudscape-design/global-styles';

import { applyTheme } from '@cloudscape-design/components/theming';

import { creativeTheme } from './creative-theme';

export type ColorTheme = 'light' | 'dark' | 'creative';

export function applyColorTheme(theme: ColorTheme): () => void {
  if (theme === 'dark') {
    applyMode(Mode.Dark);
    return () => {};
  }
  if (theme === 'creative') {
    applyMode(Mode.Light);
    return applyTheme({ theme: creativeTheme }).reset;
  }
  applyMode(Mode.Light);
  return () => {};
}

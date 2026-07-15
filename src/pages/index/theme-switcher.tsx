// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import SegmentedControl from '@cloudscape-design/components/segmented-control';

import * as localStorage from '../../common/local-storage';
import { applyColorTheme, COLOR_THEME_OPTIONS, ColorThemeName } from './apply-color-theme';

const THEME_PREFERENCE_KEY = 'Awsui-Color-Theme-Preference';

export function ThemeSwitcher() {
  const [themeName, setThemeName] = useState<ColorThemeName>(
    () => localStorage.load<ColorThemeName>(THEME_PREFERENCE_KEY) ?? 'light',
  );

  useEffect(() => {
    applyColorTheme(themeName);
    localStorage.save(THEME_PREFERENCE_KEY, themeName);
  }, [themeName]);

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1000 }}>
      <Popover
        triggerType="custom"
        size="small"
        header="Theme"
        dismissButton={true}
        position="top"
        content={
          <SegmentedControl
            selectedId={themeName}
            onChange={({ detail }) => setThemeName(detail.selectedId as ColorThemeName)}
            label="Theme"
            options={COLOR_THEME_OPTIONS}
          />
        }
      >
        <Button iconName="settings" variant="icon" ariaLabel="Theme settings" />
      </Popover>
    </div>
  );
}

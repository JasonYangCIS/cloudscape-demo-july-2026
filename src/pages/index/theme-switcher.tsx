// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import { applyTheme } from '@cloudscape-design/components/theming';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

import * as localStorage from '../../common/local-storage';
import { creativeTheme } from './creative-theme';

type ThemeName = 'light' | 'dark' | 'creative';

const THEME_PREFERENCE_KEY = 'Awsui-Color-Theme-Preference';

const THEME_OPTIONS = [
  { id: 'light', text: 'Light' },
  { id: 'dark', text: 'Dark' },
  { id: 'creative', text: 'Creative' },
];

export function ThemeSwitcher() {
  const [themeName, setThemeName] = useState<ThemeName>(
    () => localStorage.load<ThemeName>(THEME_PREFERENCE_KEY) ?? 'light',
  );
  const resetCreativeThemeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (resetCreativeThemeRef.current) {
      resetCreativeThemeRef.current();
      resetCreativeThemeRef.current = null;
    }

    if (themeName === 'creative') {
      applyMode(Mode.Light);
      resetCreativeThemeRef.current = applyTheme({ theme: creativeTheme }).reset;
    } else {
      applyMode(themeName === 'dark' ? Mode.Dark : Mode.Light);
    }

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
            onChange={({ detail }) => setThemeName(detail.selectedId as ThemeName)}
            label="Theme"
            options={THEME_OPTIONS}
          />
        }
      >
        <Button iconName="settings" variant="icon" ariaLabel="Theme settings" />
      </Popover>
    </div>
  );
}

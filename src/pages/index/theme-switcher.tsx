// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import { Mode, applyMode } from '@cloudscape-design/global-styles';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { applyTheme } from '@cloudscape-design/components/theming';

import * as localStorage from '../../common/local-storage';
import { creativeTheme } from './creative-theme';
import * as styles from './theme-switcher.module.scss';

type ColorTheme = 'light' | 'dark' | 'creative';

const STORAGE_KEY = 'Awsui-Color-Theme-Preference';

export function ThemeSwitcher() {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => localStorage.load(STORAGE_KEY) ?? 'light');
  const resetThemeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    resetThemeRef.current?.();
    resetThemeRef.current = null;

    if (colorTheme === 'dark') {
      applyMode(Mode.Dark);
    } else if (colorTheme === 'creative') {
      applyMode(Mode.Light);
      resetThemeRef.current = applyTheme({ theme: creativeTheme }).reset;
    } else {
      applyMode(Mode.Light);
    }
  }, [colorTheme]);

  return (
    <div className={styles.floatingTrigger}>
      <Popover
        triggerType="custom"
        size="small"
        position="top"
        dismissButton={true}
        header="Theme"
        content={
          <SpaceBetween size="xs">
            <SegmentedControl
              selectedId={colorTheme}
              onChange={({ detail }) => {
                const theme = detail.selectedId as ColorTheme;
                setColorTheme(theme);
                localStorage.save(STORAGE_KEY, theme);
              }}
              label="Theme"
              options={[
                { id: 'light', text: 'Light', iconName: 'light-dark' },
                { id: 'dark', text: 'Dark', iconName: 'light-dark' },
                { id: 'creative', text: 'Creative', iconName: 'gen-ai' },
              ]}
            />
          </SpaceBetween>
        }
      >
        <Button variant="icon" iconName="settings" ariaLabel="Theme settings" />
      </Popover>
    </div>
  );
}

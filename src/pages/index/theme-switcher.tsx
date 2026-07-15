// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import SegmentedControl from '@cloudscape-design/components/segmented-control';

import { applyAppTheme, AppTheme, getInitialAppTheme } from './theme';
import * as styles from './styles.module.scss';

const THEME_OPTIONS: ReadonlyArray<{ id: AppTheme; text: string }> = [
  { id: 'light', text: 'Light' },
  { id: 'dark', text: 'Dark' },
  { id: 'creative', text: 'Creative' },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<AppTheme>(getInitialAppTheme());

  return (
    <div className={styles.floatingThemeButton}>
      <Popover
        header="Theme"
        dismissButton={true}
        triggerType="custom"
        position="top"
        content={
          <SegmentedControl
            label="Theme"
            selectedId={theme}
            options={THEME_OPTIONS}
            onChange={({ detail }) => {
              const nextTheme = detail.selectedId as AppTheme;
              applyAppTheme(nextTheme);
              setTheme(nextTheme);
            }}
          />
        }
      >
        <Button variant="icon" iconName="settings" ariaLabel="Change theme" />
      </Popover>
    </div>
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import RadioGroup from '@cloudscape-design/components/radio-group';

import { currentThemePreference, ThemeName, updateThemePreference } from './theme-preference';

import * as styles from './theme-switcher.module.scss';

const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'creative', label: 'Creative' },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>(currentThemePreference);

  return (
    <div className={styles.floatingButton}>
      <Popover
        triggerType="custom"
        header="Theme"
        dismissButton={true}
        position="top"
        content={
          <div className={styles.options}>
            <RadioGroup
              value={theme}
              items={THEME_OPTIONS}
              onChange={({ detail }) => {
                const nextTheme = detail.value as ThemeName;
                setTheme(nextTheme);
                updateThemePreference(nextTheme);
              }}
            />
          </div>
        }
      >
        <Button iconName="settings" variant="icon" ariaLabel="Settings" />
      </Popover>
    </div>
  );
}

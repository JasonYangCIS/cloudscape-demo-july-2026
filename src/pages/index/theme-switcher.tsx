// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import RadioGroup from '@cloudscape-design/components/radio-group';

import { THEME_OPTIONS, useThemeSwitcher } from './theme';

import * as styles from './theme-switcher.module.scss';

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeSwitcher();

  return (
    <div className={styles.floatingButton}>
      <Popover
        triggerType="custom"
        header="Theme"
        dismissButton={true}
        position="top"
        content={
          <RadioGroup
            value={theme}
            onChange={({ detail }) => setTheme(detail.value as typeof theme)}
            items={THEME_OPTIONS.map(option => ({ value: option.value, label: option.label }))}
          />
        }
      >
        <Button variant="icon" iconName="settings" ariaLabel="Theme settings" />
      </Popover>
    </div>
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import RadioGroup from '@cloudscape-design/components/radio-group';

import { getInitialThemeChoice, setThemeChoice, ThemeChoice } from '../../common/apply-theme';

import * as styles from './theme-switcher.module.scss';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeChoice>(getInitialThemeChoice);

  return (
    <div className={styles.wrapper}>
      <Popover
        triggerType="custom"
        header="Theme"
        position="top"
        dismissButton={true}
        renderWithPortal={true}
        content={
          <div className={styles.options}>
            <RadioGroup
              value={theme}
              onChange={({ detail }) => {
                const choice = detail.value as ThemeChoice;
                setTheme(choice);
                setThemeChoice(choice);
              }}
              items={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'cyberpunk', label: 'Cyberpunk' },
              ]}
            />
          </div>
        }
      >
        <Button
          className={styles.trigger}
          iconName="settings"
          variant="icon"
          ariaLabel="Change theme"
        />
      </Popover>
    </div>
  );
}

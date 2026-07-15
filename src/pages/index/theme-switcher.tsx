// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import RadioGroup from '@cloudscape-design/components/radio-group';
import { ApplyThemeResult } from '@cloudscape-design/components/theming';

import * as localStorage from '../../common/local-storage';
import { applyThemeId, THEME_STORAGE_KEY, ThemeId } from './themes';

import * as styles from './theme-switcher.module.scss';

export function ThemeSwitcher() {
  const [themeId, setThemeId] = useState<ThemeId>(() => localStorage.load<ThemeId>(THEME_STORAGE_KEY) ?? 'light');
  const resetRef = useRef<ApplyThemeResult>();

  useEffect(() => {
    applyThemeId(themeId, resetRef);
  }, [themeId]);

  return (
    <div className={styles.floatingButton}>
      <Popover
        triggerType="custom"
        header="Theme"
        dismissButton={false}
        position="top"
        content={
          <RadioGroup
            value={themeId}
            onChange={({ detail }) => {
              const newThemeId = detail.value as ThemeId;
              setThemeId(newThemeId);
              localStorage.save(THEME_STORAGE_KEY, newThemeId);
            }}
            items={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'creative', label: 'Creative' },
            ]}
          />
        }
      >
        <Button iconName="settings" variant="icon" ariaLabel="Open theme settings" />
      </Popover>
    </div>
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import RadioGroup from '@cloudscape-design/components/radio-group';

import { applyThemeId, loadThemeId, THEME_OPTIONS, ThemeId } from '../../common/theme';

import * as styles from './theme-switcher.module.scss';

export function ThemeSwitcher() {
  const [themeId, setThemeId] = useState<ThemeId>(loadThemeId);

  useEffect(() => {
    applyThemeId(themeId);
  }, [themeId]);

  return (
    <div className={styles['theme-switcher']}>
      <Popover
        triggerType="custom"
        header="Theme"
        position="top"
        dismissButton={false}
        content={
          <RadioGroup
            value={themeId}
            onChange={({ detail }) => setThemeId(detail.value as ThemeId)}
            items={THEME_OPTIONS}
          />
        }
      >
        <Button iconName="settings" variant="icon" ariaLabel="Change theme" />
      </Popover>
    </div>
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import RadioGroup from '@cloudscape-design/components/radio-group';

import * as localStorage from '../../common/local-storage';
import { applyThemeChoice, ThemeId } from './theme-presets';

const THEME_PREFERENCE_KEY = 'React-Commits-Theme-Preference';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>(() => localStorage.load<ThemeId>(THEME_PREFERENCE_KEY) ?? 'light');

  useEffect(() => {
    applyThemeChoice(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="theme-switcher">
      <Popover
        triggerType="custom"
        header="Theme"
        dismissButton={false}
        content={
          <RadioGroup
            value={theme}
            onChange={({ detail }) => {
              const nextTheme = detail.value as ThemeId;
              setTheme(nextTheme);
              localStorage.save(THEME_PREFERENCE_KEY, nextTheme);
              applyThemeChoice(nextTheme);
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

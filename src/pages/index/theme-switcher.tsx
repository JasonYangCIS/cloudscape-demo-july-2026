// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import SegmentedControl from '@cloudscape-design/components/segmented-control';

import { useLocalStorage } from '../commons/use-local-storage';
import { applyDashboardTheme, THEME_OPTIONS, ThemeId } from './theme';

export function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage<ThemeId>('React-CommitsDashboard-Theme', 'light');

  useEffect(() => {
    applyDashboardTheme(theme ?? 'light');
  }, [theme]);

  return (
    <div className="theme-switcher-fab">
      <Popover
        triggerType="custom"
        header="Theme"
        position="top"
        size="large"
        fixedWidth={true}
        dismissButton={true}
        content={
          <SegmentedControl
            selectedId={theme ?? 'light'}
            onChange={({ detail }) => setTheme(detail.selectedId as ThemeId)}
            label="Theme"
            options={THEME_OPTIONS.map(option => ({ id: option.id, text: option.text, iconName: option.iconName }))}
          />
        }
      >
        <Button iconName="settings" variant="icon" ariaLabel="Change theme" />
      </Popover>
    </div>
  );
}

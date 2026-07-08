// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import SegmentedControl from '@cloudscape-design/components/segmented-control';

import { currentTheme, ThemeChoice, updateTheme } from '../../common/apply-theme';

import * as styles from './theme-settings.module.scss';

export function ThemeSettings() {
  const [theme, setTheme] = useState<ThemeChoice>(currentTheme);

  return (
    <div className={styles['floating-button']}>
      <Popover
        triggerType="custom"
        header="Appearance"
        position="top"
        content={
          <SegmentedControl
            selectedId={theme}
            onChange={({ detail }) => {
              const nextTheme = detail.selectedId as ThemeChoice;
              setTheme(nextTheme);
              updateTheme(nextTheme);
            }}
            label="Theme"
            options={[
              { id: 'light', text: 'Light' },
              { id: 'dark', text: 'Dark' },
              { id: 'creative', text: 'Creative' },
            ]}
          />
        }
      >
        <Button variant="icon" iconName="settings" ariaLabel="Open theme settings" />
      </Popover>
    </div>
  );
}

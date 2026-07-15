// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import { applyMode, Mode } from '@cloudscape-design/global-styles';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import { applyTheme } from '@cloudscape-design/components/theming';

import * as localStorage from '../../common/local-storage';

import * as styles from './theme-picker.module.scss';

export type DashboardTheme = 'light' | 'dark' | 'creative';

const THEME_STORAGE_KEY = 'Commits-Dashboard-Theme';

let resetCustomTheme: (() => void) | undefined;

const creativeTheme = {
  tokens: {
    fontFamilyHeading: '"Trebuchet MS", Verdana, sans-serif',
    fontFamilyDisplay: '"Trebuchet MS", Verdana, sans-serif',
    borderRadiusButton: '20px',
    borderRadiusContainer: '20px',
    borderRadiusInput: '12px',
    borderRadiusPopover: '16px',
    colorTextAccent: '#a855f7',
    colorTextLinkDefault: '#a855f7',
    colorTextLinkHover: '#7e22ce',
    colorBackgroundButtonPrimaryDefault: '#a855f7',
    colorBackgroundButtonPrimaryHover: '#9333ea',
    colorBackgroundButtonPrimaryActive: '#7e22ce',
    colorTextButtonPrimaryDefault: '#ffffff',
    colorTextButtonPrimaryHover: '#ffffff',
    colorTextButtonPrimaryActive: '#ffffff',
    colorBackgroundContainerHeader: '#faf5ff',
    colorBackgroundLayoutMain: '#fdf4ff',
    colorChartsPaletteCategorical1: '#a855f7',
    colorChartsPaletteCategorical2: '#f472b6',
    colorChartsPaletteCategorical3: '#38bdf8',
    colorChartsPaletteCategorical4: '#fbbf24',
    colorChartsPaletteCategorical5: '#34d399',
  },
};

export function applyDashboardTheme(theme: DashboardTheme) {
  resetCustomTheme?.();
  resetCustomTheme = undefined;

  if (theme === 'dark') {
    applyMode(Mode.Dark);
  } else {
    applyMode(Mode.Light);
  }

  if (theme === 'creative') {
    resetCustomTheme = applyTheme({ theme: creativeTheme }).reset;
  }

  localStorage.save(THEME_STORAGE_KEY, theme);
}

export function ThemePicker() {
  const [theme, setTheme] = useState<DashboardTheme>(() => localStorage.load<DashboardTheme>(THEME_STORAGE_KEY) ?? 'light');

  useEffect(() => {
    applyDashboardTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['floating-button']}>
      <Popover
        triggerType="custom"
        header="Theme"
        position="top"
        dismissButton={false}
        content={
          <Box padding={{ top: 'xs' }}>
            <SegmentedControl
              selectedId={theme}
              label="Theme"
              onChange={({ detail }) => {
                const nextTheme = detail.selectedId as DashboardTheme;
                setTheme(nextTheme);
                applyDashboardTheme(nextTheme);
              }}
              options={[
                { id: 'light', text: 'Light' },
                { id: 'dark', text: 'Dark' },
                { id: 'creative', text: 'Creative' },
              ]}
            />
          </Box>
        }
      >
        <Button variant="icon" iconName="settings" ariaLabel="Theme settings" />
      </Popover>
    </div>
  );
}

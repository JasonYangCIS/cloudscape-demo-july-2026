// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import RadioGroup from '@cloudscape-design/components/radio-group';
import { applyTheme, ApplyThemeResult } from '@cloudscape-design/components/theming';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

import * as localStorage from '../../common/local-storage';

import * as styles from './theme-switcher.module.scss';

type ThemeId = 'light' | 'dark' | 'creative';

const THEME_STORAGE_KEY = 'Awsui-Theme-Preference';

const creativeTheme = {
  tokens: {
    fontFamilyBase: '"Poppins", "Trebuchet MS", sans-serif',
    fontFamilyHeading: '"Poppins", "Trebuchet MS", sans-serif',
    colorBackgroundLayoutMain: '#fdf2ff',
    colorBackgroundContainerContent: '#ffffff',
    colorBackgroundContainerHeader: '#f3e8ff',
    colorTextHeadingDefault: '#7c3aed',
    colorTextAccent: '#ec4899',
    colorTextLinkDefault: '#ec4899',
    colorBackgroundButtonPrimaryDefault: '#ec4899',
    colorBackgroundButtonPrimaryHover: '#db2777',
    colorBackgroundButtonPrimaryActive: '#be185d',
    colorBorderButtonPrimaryDefault: '#ec4899',
    colorBorderButtonPrimaryHover: '#db2777',
    colorBorderButtonPrimaryActive: '#be185d',
    borderRadiusButton: '20px',
    borderRadiusContainer: '16px',
    borderRadiusInput: '12px',
    borderRadiusCardDefault: '16px',
    colorChartsPaletteCategorical1: '#ec4899',
    colorChartsPaletteCategorical2: '#7c3aed',
    colorChartsPaletteCategorical3: '#06b6d4',
    colorChartsPaletteCategorical4: '#f59e0b',
    colorChartsPaletteCategorical5: '#10b981',
  },
};

function applyThemeId(themeId: ThemeId, resetRef: React.MutableRefObject<ApplyThemeResult | undefined>) {
  resetRef.current?.reset();
  resetRef.current = undefined;

  applyMode(themeId === 'dark' ? Mode.Dark : Mode.Light);

  if (themeId === 'creative') {
    resetRef.current = applyTheme({ theme: creativeTheme });
  }
}

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

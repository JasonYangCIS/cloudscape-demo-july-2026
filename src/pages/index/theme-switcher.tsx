// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { applyTheme, ApplyThemeResult } from '@cloudscape-design/components/theming';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

import * as localStorage from '../../common/local-storage';

import * as styles from './theme-switcher.module.scss';

type ThemeId = 'light' | 'dark' | 'creative';

const THEME_PREFERENCE_KEY = 'Awsui-Theme-Preference';

const THEME_OPTIONS = [
  { id: 'light', text: 'Light', iconName: 'light-dark' as const },
  { id: 'dark', text: 'Dark', iconName: 'light-dark' as const },
  { id: 'creative', text: 'Creative', iconName: 'gen-ai' as const },
];

let activeCreativeTheme: ApplyThemeResult | null = null;

function applyDashboardTheme(theme: ThemeId) {
  if (activeCreativeTheme) {
    activeCreativeTheme.reset();
    activeCreativeTheme = null;
  }

  document.body.removeAttribute('data-theme');

  if (theme === 'dark') {
    applyMode(Mode.Dark);
    return;
  }

  applyMode(Mode.Light);

  if (theme === 'creative') {
    document.body.setAttribute('data-theme', 'creative');
    activeCreativeTheme = applyTheme({
      theme: {
        tokens: {
          colorBackgroundButtonPrimaryDefault: { light: '#7c3aed' },
          colorBackgroundButtonPrimaryHover: { light: '#a855f7' },
          colorBackgroundButtonPrimaryActive: { light: '#6d28d9' },
          colorTextAccent: { light: '#a855f7' },
          colorTextLinkDefault: { light: '#a855f7' },
          colorTextLinkHover: { light: '#7c3aed' },
          borderRadiusButton: '24px',
          borderRadiusContainer: '16px',
          borderRadiusInput: '12px',
        },
      },
    });
  }
}

export function ThemeSwitcher() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(
    () => localStorage.load<ThemeId>(THEME_PREFERENCE_KEY) ?? 'light',
  );
  const isFirstRender = useRef(true);

  useEffect(() => {
    applyDashboardTheme(selectedTheme);
    if (!isFirstRender.current) {
      localStorage.save(THEME_PREFERENCE_KEY, selectedTheme);
    }
    isFirstRender.current = false;
  }, [selectedTheme]);

  return (
    <div className={styles.floatingButton}>
      <Popover
        triggerType="custom"
        header="Theme"
        dismissButton={false}
        position="top"
        size="small"
        content={
          <SpaceBetween size="s">
            <SegmentedControl
              selectedId={selectedTheme}
              onChange={({ detail }) => setSelectedTheme(detail.selectedId as ThemeId)}
              label="Theme"
              options={THEME_OPTIONS}
            />
            <Box variant="small" color="text-body-secondary">
              Your preference is saved and applied on your next visit.
            </Box>
          </SpaceBetween>
        }
      >
        <Button variant="icon" iconName="settings" ariaLabel="Theme settings" />
      </Popover>
    </div>
  );
}

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

const CREATIVE_FONT_ID = 'creative-theme-font';
const CREATIVE_FONT_HREF = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&display=swap';
const CREATIVE_FONT_STACK = "'Baloo 2', 'Open Sans', sans-serif";

function loadCreativeFont() {
  if (document.getElementById(CREATIVE_FONT_ID)) {
    return;
  }
  const link = document.createElement('link');
  link.id = CREATIVE_FONT_ID;
  link.rel = 'stylesheet';
  link.href = CREATIVE_FONT_HREF;
  document.head.appendChild(link);
}

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
    loadCreativeFont();
    document.body.setAttribute('data-theme', 'creative');
    activeCreativeTheme = applyTheme({
      theme: {
        tokens: {
          fontFamilyBase: CREATIVE_FONT_STACK,
          fontFamilyHeading: CREATIVE_FONT_STACK,
          fontFamilyDisplay: CREATIVE_FONT_STACK,
          colorBackgroundButtonPrimaryDefault: { light: '#ff2d78' },
          colorBackgroundButtonPrimaryHover: { light: '#ff5c9a' },
          colorBackgroundButtonPrimaryActive: { light: '#d81b60' },
          colorBackgroundLayoutMain: { light: '#f6f0ff' },
          colorBackgroundContainerHeader: { light: '#ede2ff' },
          colorBackgroundSegmentActive: { light: '#7c3aed' },
          colorBackgroundSegmentHover: { light: '#ede2ff' },
          colorTextAccent: { light: '#7c3aed' },
          colorTextHeadingDefault: { light: '#5b21b6' },
          colorTextLinkDefault: { light: '#d81b60' },
          colorTextLinkHover: { light: '#ff2d78' },
          colorBorderContainerTop: { light: '#a855f7' },
          colorChartsPaletteCategorical1: { light: '#ff2d78' },
          colorChartsPaletteCategorical2: { light: '#7c3aed' },
          colorChartsPaletteCategorical3: { light: '#06b6d4' },
          colorChartsPaletteCategorical4: { light: '#f59e0b' },
          colorChartsPaletteCategorical5: { light: '#22c55e' },
          borderRadiusButton: '999px',
          borderRadiusContainer: '24px',
          borderRadiusInput: '16px',
          borderRadiusDropdown: '16px',
          borderRadiusPopover: '20px',
          borderRadiusItem: '12px',
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
        size="medium"
        fixedWidth={true}
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

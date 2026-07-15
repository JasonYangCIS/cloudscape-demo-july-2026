// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react-webpack5';
import { applyDensity, Density } from '@cloudscape-design/global-styles';
import Link from '@cloudscape-design/components/link';

import '@cloudscape-design/global-styles/index.css';

import { applyThemeChoice, ThemeId } from '../src/pages/index/theme-presets';

applyDensity(Density.Comfortable);

function DashboardThemeDecorator({ theme, children }: { theme: ThemeId; children: React.ReactNode }) {
  useEffect(() => {
    applyThemeChoice(theme);
  }, [theme]);

  return (
    <>
      <div style={{ position: 'fixed', top: 8, left: 8, zIndex: 9999 }}>
        <Link href="/" fontSize="body-s">
          ← Back to dashboard
        </Link>
      </div>
      {children}
    </>
  );
}

const withDashboardTheme: Decorator = (Story, context) => (
  <DashboardThemeDecorator theme={context.globals.theme as ThemeId}>
    <Story />
  </DashboardThemeDecorator>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Dashboard theme',
      defaultValue: 'light' satisfies ThemeId,
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'creative', title: 'Creative' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withDashboardTheme],
};

export default preview;

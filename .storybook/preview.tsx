// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react-webpack5';
import { applyDensity, Density } from '@cloudscape-design/global-styles';
import Link from '@cloudscape-design/components/link';

import { applyThemeName, THEME_OPTIONS, ThemeName } from '../src/pages/index/theme';

import '@cloudscape-design/global-styles/index.css';

applyDensity(Density.Comfortable);

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
      description: 'Dashboard theme',
      toolbar: {
        icon: 'paintbrush',
        title: 'Theme',
        items: THEME_OPTIONS.map(option => ({ value: option.value, title: option.label })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme ?? 'light') as ThemeName;

      useEffect(() => {
        applyThemeName(theme);
      }, [theme]);

      return (
        <>
          <div style={{ marginBlockEnd: '1rem' }}>
            <Link href="/" fontSize="body-s">
              ← Back to dashboard
            </Link>
          </div>
          <Story />
        </>
      );
    },
  ],
};

export default preview;

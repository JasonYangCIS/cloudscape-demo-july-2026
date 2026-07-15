// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react-webpack5';
import { applyDensity, Density } from '@cloudscape-design/global-styles';

import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';

import { applyDashboardTheme, ThemeId } from '../src/pages/index/theme';

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
      name: 'Theme',
      description: 'Commits dashboard theme',
      defaultValue: 'light',
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
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as ThemeId) ?? 'light';

      useEffect(() => {
        applyDashboardTheme(theme);
      }, [theme]);

      return (
        <>
          <Box padding={{ vertical: 's', horizontal: 'l' }}>
            <Link href="/">← Back to Commits dashboard</Link>
          </Box>
          <Box padding="l">
            <Story />
          </Box>
        </>
      );
    },
  ],
};

export default preview;

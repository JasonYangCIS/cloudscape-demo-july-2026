// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';

import type { Preview } from '@storybook/react-webpack5';
import { applyDensity, Density } from '@cloudscape-design/global-styles';

import '@cloudscape-design/global-styles/index.css';

import { ColorTheme, applyColorTheme } from '../src/pages/index/apply-color-theme';
import { BackToDashboardLink } from '../src/pages/storybook/back-to-dashboard-link';

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
      description: 'Color theme',
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
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as ColorTheme;

      useEffect(() => applyColorTheme(theme), [theme]);

      return (
        <>
          <BackToDashboardLink />
          <Story />
        </>
      );
    },
  ],
};

export default preview;

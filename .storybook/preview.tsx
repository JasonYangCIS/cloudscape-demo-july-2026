// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react-webpack5';
import { applyDensity, Density } from '@cloudscape-design/global-styles';

import { applyThemeId, ThemeId } from '../src/common/theme';

import '@cloudscape-design/global-styles/index.css';
import './preview.css';

applyDensity(Density.Comfortable);

const withTheme: Decorator = (Story, context) => {
  const themeId = context.globals.theme as ThemeId;

  useEffect(() => {
    applyThemeId(themeId, { persist: false });
  }, [themeId]);

  return (
    <>
      <a href="/" className="back-to-dashboard-link">
        ← Back to dashboard
      </a>
      <Story />
    </>
  );
};

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
      description: 'Switch the Cloudscape theme',
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
  decorators: [withTheme],
};

export default preview;

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react-webpack5';
import { applyDensity, Density } from '@cloudscape-design/global-styles';

import { apply, ThemeChoice } from '../src/common/apply-theme';

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
      description: 'Cloudscape theme applied to components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'creative', title: 'Creative' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as ThemeChoice) ?? 'light';

      useEffect(() => {
        apply(theme);
      }, [theme]);

      return (
        <>
          <a
            href="/"
            style={{
              display: 'inline-block',
              margin: '8px 16px',
              fontFamily: 'sans-serif',
              fontSize: '14px',
            }}
          >
            ← Back to dashboard
          </a>
          <Story />
        </>
      );
    },
  ],
};

export default preview;

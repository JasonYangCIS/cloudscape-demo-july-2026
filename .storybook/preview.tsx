// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react-webpack5';
import { applyDensity, Density } from '@cloudscape-design/global-styles';

import { applyDashboardTheme, ThemeId } from '../src/pages/index/theme-switcher';

import '@cloudscape-design/global-styles/index.css';

applyDensity(Density.Comfortable);

const withDashboardTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as ThemeId) ?? 'light';

  useEffect(() => {
    applyDashboardTheme(theme);
  }, [theme]);

  return <Story />;
};

const withBackToDashboardLink: Decorator = Story => (
  <div>
    <a
      href="/"
      style={{
        display: 'inline-block',
        marginBottom: 16,
        fontFamily: "'Open Sans', -apple-system, Roboto, Helvetica, sans-serif",
        fontSize: 14,
        color: '#0972d3',
      }}
    >
      ← Back to dashboard
    </a>
    <Story />
  </div>
);

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Cloudscape theme applied to the dashboard components',
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
  decorators: [withDashboardTheme, withBackToDashboardLink],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

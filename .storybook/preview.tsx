// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react-webpack5';
import { applyDensity, Density } from '@cloudscape-design/global-styles';

import { applyColorTheme, ColorThemeName } from '../src/pages/index/apply-color-theme';

import '@cloudscape-design/global-styles/index.css';

applyDensity(Density.Comfortable);

function ColorThemeDecorator({ theme, children }: { theme: ColorThemeName; children: React.ReactNode }) {
  useEffect(() => {
    applyColorTheme(theme);
  }, [theme]);

  return (
    <>
      <a
        href="/"
        style={{
          position: 'fixed',
          top: 8,
          right: 8,
          zIndex: 1000,
          fontFamily: 'sans-serif',
          fontSize: 12,
          padding: '6px 10px',
          background: '#0F1B2A',
          color: '#FBFBFB',
          borderRadius: 4,
          textDecoration: 'none',
        }}
      >
        ← Back to dashboard
      </a>
      {children}
    </>
  );
}

const withColorTheme: Decorator = (Story, context) => (
  <ColorThemeDecorator theme={context.globals.theme as ColorThemeName}>
    <Story />
  </ColorThemeDecorator>
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
      description: 'Cloudscape color theme applied to every story',
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
  decorators: [withColorTheme],
};

export default preview;

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';

import type { Decorator, Preview } from '@storybook/react-webpack5';

import '../src/common/apply-mode';
import { applyThemeName, ThemeName } from '../src/pages/index/theme-preference';

export const globalTypes: Preview['globalTypes'] = {
  theme: {
    name: 'Theme',
    description: 'Cloudscape theme',
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
};

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as ThemeName;

  useEffect(() => {
    applyThemeName(theme ?? 'light');
  }, [theme]);

  return <Story />;
};

const preview: Preview = {
  globalTypes,
  decorators: [withTheme],
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

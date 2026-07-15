// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react-webpack5';
import { applyDensity, Density } from '@cloudscape-design/global-styles';
import Link from '@cloudscape-design/components/link';

import '@cloudscape-design/global-styles/index.css';
import { getInitialThemeChoice, setThemeChoice, ThemeChoice } from '../src/common/apply-theme';

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
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'cyberpunk', title: 'Cyberpunk' },
          { value: 'terminal', title: 'Terminal' },
          { value: 'dracula', title: 'Dracula' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: getInitialThemeChoice(),
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as ThemeChoice) ?? 'light';

      useEffect(() => {
        setThemeChoice(theme);
      }, [theme]);

      return (
        <>
          <div style={{ marginBlockEnd: '1rem' }}>
            <Link href="/index.html" target="_top">
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

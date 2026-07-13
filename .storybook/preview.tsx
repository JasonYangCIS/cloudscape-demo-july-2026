// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef } from 'react';
import type { Preview } from '@storybook/react-webpack5';
import { applyDensity, Density } from '@cloudscape-design/global-styles';
import { ApplyThemeResult } from '@cloudscape-design/components/theming';

import { applyThemeId, ThemeId } from '../src/pages/index/themes';

import '@cloudscape-design/global-styles/index.css';

applyDensity(Density.Comfortable);

function ThemeDecorator({ themeId, children }: { themeId: ThemeId; children: React.ReactNode }) {
  const resetRef = useRef<ApplyThemeResult>();

  useEffect(() => {
    applyThemeId(themeId, resetRef);
  }, [themeId]);

  return (
    <>
      <a href="/" style={{ position: 'fixed', top: 8, right: 8, zIndex: 1000 }}>
        Back to dashboard
      </a>
      {children}
    </>
  );
}

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
      description: 'Cloudscape theme applied to the story',
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
    (Story, context) => (
      <ThemeDecorator themeId={context.globals.theme as ThemeId}>
        <Story />
      </ThemeDecorator>
    ),
  ],
};

export default preview;

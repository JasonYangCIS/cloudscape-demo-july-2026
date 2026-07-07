// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: storybookConfig => {
    storybookConfig.module?.rules?.push(
      {
        test: /\.module\.scss$/,
        include: path.resolve('src/pages'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path]__[local]--[hash:base64]',
              },
              url: false,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve('src/styles'),
        use: ['style-loader', { loader: 'css-loader', options: { url: false } }, 'sass-loader'],
      },
    );
    return storybookConfig;
  },
};

export default config;

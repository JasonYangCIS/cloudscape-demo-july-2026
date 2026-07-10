// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Alert from '@cloudscape-design/components/alert';
import I18nProvider from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';

const meta: Meta<typeof I18nProvider> = {
  title: 'Utilities/I18nProvider',
  component: I18nProvider,
};

export default meta;

type Story = StoryObj<typeof I18nProvider>;

export const Default: Story = {
  render: () => (
    <I18nProvider messages={[messages]} locale="en">
      <Alert type="info" header="Reminder">
        Your session will expire soon.
      </Alert>
    </I18nProvider>
  ),
};

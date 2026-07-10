// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import PromptInput from '@cloudscape-design/components/prompt-input';

function PromptInputExample() {
  const [value, setValue] = useState('');

  return (
    <PromptInput
      ariaLabel="Chat input"
      value={value}
      onChange={event => setValue(event.detail.value)}
      onAction={event => console.log('Submitted:', event.detail.value)}
      actionButtonIconName="send"
      actionButtonAriaLabel="Submit prompt"
      placeholder="Ask a question"
      minRows={1}
      maxRows={4}
    />
  );
}

const meta: Meta<typeof PromptInput> = {
  title: 'Forms/PromptInput',
  component: PromptInput,
};

export default meta;

type Story = StoryObj<typeof PromptInput>;

export const Default: Story = {
  render: () => <PromptInputExample />,
};

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import PromptInput from '@cloudscape-design/components/prompt-input';

const meta: Meta<typeof PromptInput> = {
  title: 'Design System/PromptInput',
  component: PromptInput,
};

export default meta;

type Story = StoryObj<typeof PromptInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <PromptInput
        ariaLabel="Chat input"
        value={value}
        onChange={event => setValue(event.detail.value)}
        onAction={() => {}}
        actionButtonIconName="send"
        actionButtonAriaLabel="Submit prompt"
        placeholder="Ask a question"
        minRows={1}
        maxRows={4}
      />
    );
  },
};

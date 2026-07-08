// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Tooltip from '@cloudscape-design/components/tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Design System/Tooltip',
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => {
    const iconRef = React.useRef<HTMLSpanElement>(null);
    const [showTooltip, setShowTooltip] = React.useState(false);

    return (
      <span
        ref={iconRef}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        i
        {showTooltip && (
          <Tooltip content="Additional information about this field" getTrack={() => iconRef.current} />
        )}
      </span>
    );
  },
};

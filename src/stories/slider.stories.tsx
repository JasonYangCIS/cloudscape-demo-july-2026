// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Slider, { SliderProps } from '@cloudscape-design/components/slider';

function SliderExample() {
  const [value, setValue] = useState<SliderProps['value']>(25);

  return (
    <Slider
      ariaLabel="slider-example"
      value={value}
      min={0}
      max={100}
      step={10}
      tickMarks={true}
      referenceValues={[25, 50, 75]}
      onChange={({ detail }) => setValue(detail.value)}
    />
  );
}

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => <SliderExample />,
};

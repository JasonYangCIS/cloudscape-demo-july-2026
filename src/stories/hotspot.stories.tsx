// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AnnotationContext, { AnnotationContextProps } from '@cloudscape-design/components/annotation-context';
import Hotspot from '@cloudscape-design/components/hotspot';
import Input from '@cloudscape-design/components/input';

const i18nStrings: AnnotationContextProps.I18nStrings = {
  nextButtonText: 'Next',
  previousButtonText: 'Previous',
  finishButtonText: 'Finish',
  labelDismissAnnotation: 'Dismiss',
  labelHotspot: (openState, stepIndex, totalStepCount) => `Hotspot, step ${stepIndex} of ${totalStepCount}`,
  stepCounterText: (stepIndex, totalStepCount) => `Step ${stepIndex} of ${totalStepCount}`,
  taskTitle: (taskIndex, taskTitle) => `Task ${taskIndex}: ${taskTitle}`,
};

function HotspotDemo() {
  const [value, setValue] = useState('');

  return (
    <AnnotationContext
      currentTutorial={null}
      onStartTutorial={() => {}}
      onExitTutorial={() => {}}
      i18nStrings={i18nStrings}
    >
      <Hotspot hotspotId="search-input" direction="bottom">
        <Input value={value} onChange={({ detail }) => setValue(detail.value)} />
      </Hotspot>
    </AnnotationContext>
  );
}

const meta: Meta<typeof Hotspot> = {
  title: 'Guidance/Hotspot',
  component: Hotspot,
};

export default meta;

type Story = StoryObj<typeof Hotspot>;

export const Default: Story = {
  render: () => <HotspotDemo />,
};

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AnnotationContext, { AnnotationContextProps } from '@cloudscape-design/components/annotation-context';
import Hotspot from '@cloudscape-design/components/hotspot';
import Input from '@cloudscape-design/components/input';

const meta: Meta<typeof Hotspot> = {
  title: 'Design System/Hotspot',
  component: Hotspot,
};

export default meta;

type Story = StoryObj<typeof Hotspot>;

const annotationContextStrings: AnnotationContextProps.I18nStrings = {
  nextButtonText: 'Next',
  previousButtonText: 'Previous',
  finishButtonText: 'Finish',
  labelDismissAnnotation: 'Dismiss',
  labelHotspot: (open, step, total) => `Hotspot, step ${step + 1} of ${total}`,
  stepCounterText: (step, total) => `Step ${step + 1}/${total}`,
  taskTitle: (index, title) => `Task ${index + 1}: ${title}`,
};

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <AnnotationContext
        currentTutorial={null}
        onStartTutorial={() => {}}
        onExitTutorial={() => {}}
        i18nStrings={annotationContextStrings}
      >
        <Hotspot hotspotId="search-input" direction="bottom">
          <Input value={value} onChange={({ detail }) => setValue(detail.value)} />
        </Hotspot>
      </AnnotationContext>
    );
  },
};

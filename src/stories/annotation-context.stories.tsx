// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AnnotationContext, { AnnotationContextProps } from '@cloudscape-design/components/annotation-context';
import Button from '@cloudscape-design/components/button';
import Hotspot from '@cloudscape-design/components/hotspot';

const tutorial: AnnotationContextProps.Tutorial = {
  title: 'Getting started',
  description: 'Learn the basics',
  completedScreenDescription: 'You have completed the tutorial.',
  completed: false,
  tasks: [
    {
      title: 'Create a resource',
      steps: [
        { title: 'Click create', content: 'Click here to create a new resource', hotspotId: 'create-button' },
      ],
    },
  ],
};

const i18nStrings: AnnotationContextProps.I18nStrings = {
  nextButtonText: 'Next',
  previousButtonText: 'Previous',
  finishButtonText: 'Finish',
  labelDismissAnnotation: 'Dismiss',
  labelHotspot: (openState, stepIndex, totalStepCount) => `Hotspot, step ${stepIndex} of ${totalStepCount}`,
  stepCounterText: (stepIndex, totalStepCount) => `Step ${stepIndex} of ${totalStepCount}`,
  taskTitle: (taskIndex, taskTitle) => `Task ${taskIndex}: ${taskTitle}`,
};

function AnnotationContextDemo() {
  const [currentTutorial, setCurrentTutorial] = useState<AnnotationContextProps.Tutorial | null>(tutorial);

  return (
    <AnnotationContext
      currentTutorial={currentTutorial}
      i18nStrings={i18nStrings}
      onStartTutorial={({ detail }) => setCurrentTutorial(detail.tutorial)}
      onExitTutorial={() => setCurrentTutorial(null)}
      onFinish={() => setCurrentTutorial(null)}
    >
      <Button>
        Create resource
        <Hotspot hotspotId="create-button" />
      </Button>
    </AnnotationContext>
  );
}

const meta: Meta<typeof AnnotationContext> = {
  title: 'Guidance/AnnotationContext',
  component: AnnotationContext,
};

export default meta;

type Story = StoryObj<typeof AnnotationContext>;

export const Default: Story = {
  render: () => <AnnotationContextDemo />,
};

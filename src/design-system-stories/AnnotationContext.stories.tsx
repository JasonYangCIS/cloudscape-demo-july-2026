// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AnnotationContext, { AnnotationContextProps } from '@cloudscape-design/components/annotation-context';
import Hotspot from '@cloudscape-design/components/hotspot';
import Button from '@cloudscape-design/components/button';

const meta: Meta<typeof AnnotationContext> = {
  title: 'Design System/AnnotationContext',
  component: AnnotationContext,
};

export default meta;

type Story = StoryObj<typeof AnnotationContext>;

const tutorial: AnnotationContextProps.Tutorial = {
  title: 'Getting started',
  description: 'Learn the basics',
  completedScreenDescription: 'You have completed the tutorial.',
  completed: false,
  tasks: [
    {
      title: 'Create a resource',
      steps: [{ title: 'Click create', content: 'Click here to create a new resource', hotspotId: 'create-button' }],
    },
  ],
};

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
    const [currentTutorial, setCurrentTutorial] = React.useState<AnnotationContextProps.Tutorial | null>(tutorial);

    return (
      <AnnotationContext
        currentTutorial={currentTutorial}
        i18nStrings={annotationContextStrings}
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
  },
};

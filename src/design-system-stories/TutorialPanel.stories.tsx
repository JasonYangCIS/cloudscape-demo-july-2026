// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import AnnotationContext, { AnnotationContextProps } from '@cloudscape-design/components/annotation-context';
import TutorialPanel, { TutorialPanelProps } from '@cloudscape-design/components/tutorial-panel';
import Hotspot from '@cloudscape-design/components/hotspot';
import Button from '@cloudscape-design/components/button';

const meta: Meta<typeof TutorialPanel> = {
  title: 'Design System/TutorialPanel',
  component: TutorialPanel,
};

export default meta;

type Story = StoryObj<typeof TutorialPanel>;

const tutorials: TutorialPanelProps.Tutorial[] = [
  {
    title: 'Create a resource',
    description: 'Learn how to create your first resource.',
    completedScreenDescription: 'You created a resource!',
    completed: false,
    tasks: [
      {
        title: 'Start creation',
        steps: [
          {
            title: 'Click Create',
            content: 'Click the Create button to begin.',
            hotspotId: 'create-button',
          },
        ],
      },
    ],
  },
];

const annotationContextStrings: AnnotationContextProps.I18nStrings = {
  nextButtonText: 'Next',
  previousButtonText: 'Previous',
  finishButtonText: 'Finish',
  labelDismissAnnotation: 'Dismiss',
  labelHotspot: (open, step, total) => `Hotspot, step ${step + 1} of ${total}`,
  stepCounterText: (step, total) => `Step ${step + 1}/${total}`,
  taskTitle: (index, title) => `Task ${index + 1}: ${title}`,
};

const tutorialPanelI18nStrings: TutorialPanelProps.I18nStrings = {
  loadingText: 'Loading',
  tutorialListTitle: 'Tutorials',
  tutorialListDescription: 'Choose a tutorial to get started.',
  tutorialListDownloadLinkText: 'Download PDF',
  tutorialCompletedText: 'Completed',
  learnMoreLinkText: 'Learn more',
  startTutorialButtonText: 'Start tutorial',
  restartTutorialButtonText: 'Restart tutorial',
  completionScreenTitle: 'Tutorial complete',
  feedbackLinkText: 'Give feedback',
  dismissTutorialButtonText: 'Dismiss',
  taskTitle: (taskIndex, taskTitle) => `Task ${taskIndex + 1}: ${taskTitle}`,
  stepTitle: (stepIndex, stepTitle) => `Step ${stepIndex + 1}: ${stepTitle}`,
  labelExitTutorial: 'Exit tutorial',
  labelTotalSteps: total => `${total} steps total`,
  labelLearnMoreExternalIcon: 'Opens in a new tab',
  labelsTaskStatus: { pending: 'Pending', 'in-progress': 'In progress', success: 'Success' },
};

export const Default: Story = {
  render: () => {
    const [currentTutorial, setCurrentTutorial] = React.useState<AnnotationContextProps.Tutorial | null>(null);

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

        <TutorialPanel tutorials={tutorials} i18nStrings={tutorialPanelI18nStrings} onFeedbackClick={() => {}} />
      </AnnotationContext>
    );
  },
};

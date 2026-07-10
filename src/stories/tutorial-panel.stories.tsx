// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TutorialPanel, { TutorialPanelProps } from '@cloudscape-design/components/tutorial-panel';

const i18nStrings: TutorialPanelProps.I18nStrings = {
  loadingText: 'Loading',
  tutorialListTitle: 'Tutorials',
  tutorialListDescription: 'Choose a tutorial to get started.',
  tutorialListDownloadLinkText: 'Download PDF version',
  tutorialCompletedText: 'Completed',
  learnMoreLinkText: 'Learn more',
  startTutorialButtonText: 'Start tutorial',
  restartTutorialButtonText: 'Restart tutorial',
  completionScreenTitle: 'Tutorial complete',
  feedbackLinkText: 'Give feedback',
  dismissTutorialButtonText: 'Dismiss tutorial',
  taskTitle: (taskIndex, taskTitle) => `Task ${taskIndex}: ${taskTitle}`,
  stepTitle: (stepIndex, stepTitle) => `Step ${stepIndex}: ${stepTitle}`,
  labelExitTutorial: 'Exit tutorial',
  labelTotalSteps: totalStepCount => `Total steps: ${totalStepCount}`,
  labelLearnMoreExternalIcon: 'Opens in a new tab',
  labelsTaskStatus: { pending: 'Pending', 'in-progress': 'In progress', success: 'Success' },
};

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

const meta: Meta<typeof TutorialPanel> = {
  title: 'Guidance/TutorialPanel',
  component: TutorialPanel,
};

export default meta;

type Story = StoryObj<typeof TutorialPanel>;

export const Default: Story = {
  args: {
    i18nStrings,
    tutorials,
    loading: false,
    onFeedbackClick: () => console.log('feedback clicked'),
  },
};

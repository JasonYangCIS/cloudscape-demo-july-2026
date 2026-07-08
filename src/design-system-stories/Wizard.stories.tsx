// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Wizard, { WizardProps } from '@cloudscape-design/components/wizard';

const steps: WizardProps.Step[] = [
  { title: 'Step 1', content: <div>Content 1</div> },
  { title: 'Step 2', content: <div>Content 2</div> },
  { title: 'Step 3', content: <div>Content 3</div> },
];

const meta: Meta<typeof Wizard> = {
  title: 'Design System/Wizard',
  component: Wizard,
};

export default meta;

type Story = StoryObj<typeof Wizard>;

export const Default: Story = {
  render: () => (
    <Wizard
      steps={steps}
      i18nStrings={{
        stepNumberLabel: stepNumber => `Step ${stepNumber}`,
        collapsedStepsLabel: (stepNumber, stepsCount) => `Step ${stepNumber} of ${stepsCount}`,
        navigationAriaLabel: 'Steps',
        cancelButton: 'Cancel',
        previousButton: 'Previous',
        nextButton: 'Next',
        submitButton: 'Submit',
        optional: 'optional',
      }}
      onCancel={() => console.log('cancelled')}
      onSubmit={() => console.log('submitted')}
    />
  ),
};

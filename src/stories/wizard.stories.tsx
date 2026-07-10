// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Wizard, { WizardProps } from '@cloudscape-design/components/wizard';

const meta: Meta<typeof Wizard> = {
  title: 'Forms/Wizard',
  component: Wizard,
};

export default meta;

type Story = StoryObj<typeof Wizard>;

const i18nStrings: WizardProps.I18nStrings = {
  stepNumberLabel: stepNumber => `Step ${stepNumber}`,
  collapsedStepsLabel: (stepNumber, stepsCount) => `Step ${stepNumber} of ${stepsCount}`,
  navigationAriaLabel: 'Steps',
  cancelButton: 'Cancel',
  previousButton: 'Previous',
  nextButton: 'Next',
  submitButton: 'Submit',
  optional: 'optional',
};

function BasicWizard() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps: WizardProps.Step[] = [
    { title: 'Step 1', content: <div>Content 1</div> },
    { title: 'Step 2', content: <div>Content 2</div> },
    { title: 'Step 3', content: <div>Content 3</div> },
  ];

  return (
    <Wizard
      steps={steps}
      activeStepIndex={activeStepIndex}
      i18nStrings={i18nStrings}
      onNavigate={({ detail }) => setActiveStepIndex(detail.requestedStepIndex)}
      onCancel={() => console.log('cancelled')}
      onSubmit={() => console.log('submitted')}
    />
  );
}

export const Default: Story = {
  render: () => <BasicWizard />,
};

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Modal from '@cloudscape-design/components/modal';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

function ModalExample() {
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      header="Delete instance"
      visible={visible}
      closeAriaLabel="Close modal"
      onDismiss={() => setVisible(false)}
      footer={
        <SpaceBetween direction="horizontal" size="xs" alignItems="center">
          <Button variant="link" onClick={() => setVisible(false)}>
            Cancel
          </Button>
          <Button variant="primary">Delete</Button>
        </SpaceBetween>
      }
    >
      This will permanently delete your instance, and may affect the performance of other resources.
    </Modal>
  );
}

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => <ModalExample />,
};

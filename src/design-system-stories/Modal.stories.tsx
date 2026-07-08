// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Modal from '@cloudscape-design/components/modal';
import Button from '@cloudscape-design/components/button';

const meta: Meta<typeof Modal> = {
  title: 'Design System/Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(false);

    return (
      <>
        <Button onClick={() => setVisible(true)}>Show modal</Button>
        <Modal
          header="Delete instance"
          visible={visible}
          closeAriaLabel="Close modal"
          onDismiss={() => setVisible(false)}
          footer={
            <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="link" onClick={() => setVisible(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setVisible(false)}>
                Delete
              </Button>
            </span>
          }
        >
          This will permanently delete your instance, and may affect the performance of other resources.
        </Modal>
      </>
    );
  },
};

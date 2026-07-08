// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import SpaceBetween from '@cloudscape-design/components/space-between';

const meta: Meta<typeof Form> = {
  title: 'Design System/Form',
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => {
    function BasicForm() {
      const [name, setName] = React.useState('');

      return (
        <Form
          header={<Header variant="h1">Create resource</Header>}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link">Cancel</Button>
              <Button variant="primary">Submit</Button>
            </SpaceBetween>
          }
        >
          <FormField label="Resource name">
            <Input value={name} onChange={({ detail }) => setName(detail.value)} />
          </FormField>
        </Form>
      );
    }
    return <BasicForm />;
  },
};

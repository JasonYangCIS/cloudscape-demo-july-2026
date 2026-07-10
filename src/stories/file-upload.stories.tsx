// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import FileUpload from '@cloudscape-design/components/file-upload';

const meta: Meta<typeof FileUpload> = {
  title: 'Forms/FileUpload',
  component: FileUpload,
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

function Example() {
  const [value, setValue] = useState<File[]>([]);

  return (
    <FileUpload
      value={value}
      onChange={({ detail }) => setValue(detail.value)}
      i18nStrings={{
        uploadButtonText: multiple => (multiple ? 'Choose files' : 'Choose file'),
        dropzoneText: multiple => (multiple ? 'Drop files to upload' : 'Drop file to upload'),
        removeFileAriaLabel: (fileIndex, fileName) => `Remove file ${fileName} at index ${fileIndex + 1}`,
        limitShowFewer: 'Show fewer files',
        limitShowMore: 'Show more files',
        errorIconAriaLabel: 'Error',
        warningIconAriaLabel: 'Warning',
      }}
      constraintText="PDF or Word documents only, up to 5 MB."
    />
  );
}

export const Default: Story = {
  render: () => <Example />,
};

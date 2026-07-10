// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useCallback, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import TagEditor, { TagEditorProps } from '@cloudscape-design/components/tag-editor';

const meta: Meta<typeof TagEditor> = {
  title: 'Forms/TagEditor',
  component: TagEditor,
};

export default meta;

type Story = StoryObj<typeof TagEditor>;

function TagEditorDemo() {
  const [tags, setTags] = useState<ReadonlyArray<TagEditorProps.Tag>>([
    { key: 'Environment', value: 'Production', existing: true },
  ]);

  const onChange = useCallback((event: NonCancelableCustomEvent<TagEditorProps.ChangeDetail>) => {
    setTags(event.detail.tags);
  }, []);

  return (
    <TagEditor
      tags={tags}
      onChange={onChange}
      i18nStrings={{
        keyPlaceholder: 'Enter key',
        valuePlaceholder: 'Enter value',
        addButton: 'Add new tag',
        removeButton: 'Remove',
        undoButton: 'Undo',
        undoPrompt: 'This tag will be removed upon saving changes',
        keyHeader: 'Key',
        valueHeader: 'Value',
        optional: 'optional',
        emptyTags: 'No tags associated with the resource.',
        emptyKeyError: 'You must specify a tag key',
        maxKeyCharLengthError: 'The maximum number of characters you can use in a tag key is 128.',
        maxValueCharLengthError: 'The maximum number of characters you can use in a tag value is 256.',
        duplicateKeyError: 'You must specify a unique tag key.',
        invalidKeyError: 'Invalid key.',
        invalidValueError: 'Invalid value.',
        awsPrefixError: 'Cannot start with aws:',
      }}
    />
  );
}

export const Default: Story = {
  render: () => <TagEditorDemo />,
};

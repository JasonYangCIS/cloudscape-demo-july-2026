// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import CodeEditor, { CodeEditorProps } from '@cloudscape-design/components/code-editor';

const meta: Meta<typeof CodeEditor> = {
  title: 'Data display/CodeEditor',
  component: CodeEditor,
};

export default meta;

type Story = StoryObj<typeof CodeEditor>;

function MyEditor() {
  const [ace, setAce] = useState<any>();
  const [value, setValue] = useState('{\n  "key": "value"\n}');
  const [preferences, setPreferences] = useState<CodeEditorProps.Preferences | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('ace-builds')
      .then(aceModule => {
        aceModule.config.set('useStrictCSP', true);
        setAce(aceModule);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <CodeEditor
      ace={ace}
      language="json"
      value={value}
      preferences={preferences}
      onPreferencesChange={e => setPreferences(e.detail)}
      onDelayedChange={e => setValue(e.detail.value)}
      loading={loading}
      i18nStrings={{
        loadingState: 'Loading code editor',
        errorState: 'There was an error loading the code editor.',
        errorStateRecovery: 'Retry',
        editorGroupAriaLabel: 'Code editor',
        statusBarGroupAriaLabel: 'Status bar',
        cursorPosition: (row, column) => `Ln ${row}, Col ${column}`,
        errorsTab: 'Errors',
        warningsTab: 'Warnings',
        preferencesButtonAriaLabel: 'Preferences',
        paneCloseButtonAriaLabel: 'Close',
        preferencesModalHeader: 'Preferences',
        preferencesModalCancel: 'Cancel',
        preferencesModalConfirm: 'Confirm',
        preferencesModalWrapLines: 'Wrap lines',
        preferencesModalTheme: 'Theme',
        preferencesModalLightThemes: 'Light themes',
        preferencesModalDarkThemes: 'Dark themes',
      }}
    />
  );
}

export const Default: Story = {
  render: () => <MyEditor />,
};

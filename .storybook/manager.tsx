// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { addons, types } from 'storybook/manager-api';

addons.register('dashboard-link', () => {
  addons.add('dashboard-link/tool', {
    type: types.TOOL,
    title: 'Back to dashboard',
    match: () => true,
    render: () => (
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          fontSize: 13,
          fontWeight: 700,
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        ← Back to dashboard
      </a>
    ),
  });
});

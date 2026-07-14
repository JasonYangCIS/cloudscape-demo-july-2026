// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { CustomAppLayout } from '../commons/common-components';
import CommitsDashboard from './commits-dashboard';

import '../../styles/base.scss';

export function App() {
  return (
    <CustomAppLayout navigationHide={true} toolsHide={true} content={<CommitsDashboard />} contentType="default" />
  );
}

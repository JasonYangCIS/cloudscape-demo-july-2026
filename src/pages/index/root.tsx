// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import { Commit } from '../../fake-server/types';
import DataProvider from '../commons/data-provider';
import { Breadcrumbs } from '../commons/breadcrumbs';
import { CustomAppLayout } from '../commons/common-components';
import { CommitsDashboard } from './commits-dashboard';

import '../../styles/base.scss';

export function App() {
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    new DataProvider().getDataWithDates<Commit>('commits').then(setCommits);
  }, []);

  return (
    <CustomAppLayout
      navigationHide={true}
      toolsHide={true}
      breadcrumbs={<Breadcrumbs items={[{ text: 'Commits dashboard', href: '#' }]} />}
      content={<CommitsDashboard commits={commits} />}
      contentType="default"
    />
  );
}

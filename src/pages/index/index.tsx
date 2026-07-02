// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Commit } from '../../fake-server/types';
import DataProvider from '../commons/data-provider';
import { App } from './root';

new DataProvider().getDataWithDates<Commit>('commits').then(commits => {
  createRoot(document.getElementById('app')!).render(<App commits={commits} />);
});

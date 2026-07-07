// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Commit } from '../../fake-server/types';
import DataProvider from '../commons/data-provider';
import { App } from './root';

// Benign browser quirk triggered by ResizeObserver-based chart components (e.g. Highcharts)
// when a resize callback doesn't complete within one animation frame. Safe to ignore.
window.addEventListener('error', event => {
  if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
    event.stopImmediatePropagation();
  }
});

new DataProvider().getDataWithDates<Commit>('commits').then(commits => {
  createRoot(document.getElementById('app')!).render(<App commits={commits} />);
});

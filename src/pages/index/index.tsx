// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './root';

// Harmless browser warning triggered by chart resize observers; safe to ignore.
// See https://github.com/WICG/resize-observer/issues/38
window.addEventListener('error', event => {
  if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
    event.stopImmediatePropagation();
  }
});

createRoot(document.getElementById('app')!).render(<App />);

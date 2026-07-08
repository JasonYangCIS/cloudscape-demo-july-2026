// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './root';

// The charts on this page use ResizeObserver internally. Browsers emit this benign
// warning when an observer's callback can't finish within one frame; it doesn't
// indicate broken layout or lost updates (the browser resumes on the next frame).
window.addEventListener('error', event => {
  if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
    event.stopImmediatePropagation();
  }
});

createRoot(document.getElementById('app')!).render(<App />);

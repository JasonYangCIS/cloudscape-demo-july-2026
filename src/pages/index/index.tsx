// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './root';

// The charts on this page rely on ResizeObserver for responsive sizing. Deferring each
// callback to the next animation frame breaks the same-frame notify loop that triggers
// the browser's benign "ResizeObserver loop completed with undelivered notifications"
// message, instead of just hiding it after the fact.
const NativeResizeObserver = window.ResizeObserver;
window.ResizeObserver = class extends NativeResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    super((entries, observer) => window.requestAnimationFrame(() => callback(entries, observer)));
  }
};

// Fallback in case the message still surfaces (e.g. from an observer created before this
// module ran): preventDefault() suppresses the browser's default console reporting.
window.addEventListener('error', event => {
  if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
});

createRoot(document.getElementById('app')!).render(<App />);

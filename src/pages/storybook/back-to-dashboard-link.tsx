// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Link from '@cloudscape-design/components/link';

import * as styles from './back-to-dashboard-link.module.scss';

export function BackToDashboardLink() {
  return (
    <div className={styles.floatingLink}>
      <Link href="/" target="_top">
        ← Back to dashboard
      </Link>
    </div>
  );
}

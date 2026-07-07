// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { CustomAppLayout } from '../commons/common-components';

import '../../styles/base.scss';

function IntroContent() {
  return (
    <SpaceBetween size="l">
      <Header variant="h1" description="Build a code commits dashboard with Cloudscape and Builder.io.">
        Welcome to the workshop
      </Header>
      <Container header={<Header variant="h2">What you'll build</Header>}>
        <SpaceBetween size="s">
          <Box variant="p">
            <b>1. A commits dashboard.</b> An area chart and a bar chart summarizing commit activity, and a table
            listing individual commits. You'll turn a Figma design into working Cloudscape components, right on top
            of this page.
          </Box>
          <Box variant="p">
            <b>2. A custom theme.</b> Once the dashboard is working, you'll apply your own branding on top of these
            same Cloudscape components using <Box variant="code">@cloudscape-design/components/theming</Box>, without
            changing any component code.
          </Box>
        </SpaceBetween>
      </Container>
      <Container header={<Header variant="h2">How to get started</Header>}>
        <SpaceBetween size="s">
          <Box variant="p">
            Full step-by-step instructions for this workshop, including setup requirements, the Figma design you'll
            be working from, and guidance for both the dashboard and theming exercises, are available on the
            workshop site:
          </Box>
          <Link external={true} href="https://wdc-seattle-2026.vercel.app/">
            wdc-seattle-2026.vercel.app
          </Link>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}

export function App() {
  return (
    <CustomAppLayout
      navigationHide={true}
      toolsHide={true}
      content={<IntroContent />}
      contentType="default"
    />
  );
}

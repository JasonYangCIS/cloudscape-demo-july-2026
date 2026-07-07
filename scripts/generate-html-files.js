// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import path from 'node:path';
import examplesList from '../examples-list.json' with { type: 'json' };
import { writeFileAsync } from './utils/fsAsync.js';
import config from './config.js';

const frameworkUtils = {
  initialMarkup: `<div id="app"></div>`,
  getStyles(pageName) {
    return `
        <link href="vendor.css" rel="stylesheet">
        <link href="${pageName}.css" rel="stylesheet">
      `;
  },
  getScripts(pageName) {
    return `
        <script src="vendor.js"></script>
        <script src="${pageName}.js"></script>
      `;
  },
};

function applyTheme(filename, extension) {
  return `${filename}.${extension}`;
}

function getPageContent(pageName, { title }) {
  const systemName = 'Cloudscape';
  const pageTitle = `${systemName} Demos - ${title}`;
  const headerTitle = pageName === 'index' ? 'Builder.io &amp; Amazon Workshop - Cloudscape' : 'Cloudscape Demos';
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <title>${pageTitle}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    ${frameworkUtils.getStyles(pageName)}
</head>
<!-- this class is not needed in production, only for testing -->
<body class="awsui-visual-refresh">
<div id="b">
    <header class="custom-main-header" id="h">
        <ul class="menu-list awsui-context-top-navigation">
            <li class="title"><a href="index.html">${headerTitle}</a></li>
        </ul>
    </header>
    ${frameworkUtils.initialMarkup}
</div>
<script src="./libs/fake-server.js"></script>
${frameworkUtils.getScripts(pageName)}
</body>
</html>
`;
}

function groupByCategory(examples) {
  const groups = new Map();
  for (const example of examples) {
    const category = example.category ?? 'Other';
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category).push(example);
  }
  return groups;
}

function getExamplesContent() {
  const categories = groupByCategory(examplesList.filter(example => !example.hidden));
  const sections = [...categories.entries()]
    .map(
      ([category, examples]) => `
      <section class="category-section">
        <h2 class="category-title">${category}</h2>
        <ul class="example-grid">
          ${examples
            .map(
              example => `<li><a class="example-card" href="${applyTheme(example.path, 'html')}">${example.title}</a></li>`,
            )
            .join('\n          ')}
        </ul>
      </section>`,
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Builder.io &amp; AWS Workshop - Cloudscape Demos</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <style>
      :root {
        --color-accent: #0972d3;
        --color-text: #16191f;
        --color-text-secondary: #5f6b7a;
        --color-border: #e9ebed;
        --color-surface: #ffffff;
        --color-background: #f9fafb;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        background: var(--color-background);
        color: var(--color-text);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      .page-header {
        padding: 32px 40px;
        background: var(--color-surface);
        border-bottom: 1px solid var(--color-border);
      }
      .eyebrow {
        margin: 0 0 8px;
        color: var(--color-accent);
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .page-title {
        margin: 0 0 8px;
        font-size: 28px;
      }
      .page-subtitle {
        margin: 0;
        max-width: 720px;
        color: var(--color-text-secondary);
        font-size: 15px;
        line-height: 1.5;
      }
      main {
        padding: 32px 40px 56px;
        max-width: 1200px;
      }
      .category-section {
        margin-bottom: 32px;
      }
      .category-title {
        margin: 0 0 12px;
        font-size: 16px;
        color: var(--color-text);
      }
      .example-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 12px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .example-card {
        display: block;
        padding: 14px 16px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        font-size: 14px;
        text-decoration: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .example-card:hover {
        border-color: var(--color-accent);
        box-shadow: 0 1px 4px rgba(9, 114, 211, 0.2);
      }
      @media (max-width: 600px) {
        .page-header,
        main {
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    </style>
  </head>
  <body>
    <header class="page-header">
      <p class="eyebrow">Builder.io &amp; AWS Workshop</p>
      <h1 class="page-title">Cloudscape Demos</h1>
      <p class="page-subtitle">
        Reference examples for other Cloudscape patterns. Your workshop starting point is on the <a href="index.html">home page</a>.
      </p>
    </header>
    <main>${sections}
    </main>
  </body>
</html>
`;
}

function generateExamplesFile() {
  const filePath = path.join(config.outputPath, 'examples.html');
  return writeFileAsync(filePath, getExamplesContent());
}

function generateHtmlFile(page) {
  const pageName = page.path.split('/').pop();
  const content = getPageContent(pageName, page);
  const filePath = path.join(config.outputPath, applyTheme(pageName, 'html'));
  return writeFileAsync(filePath, content);
}

for (const page of examplesList) {
  await generateHtmlFile(page);
}
await generateExamplesFile();

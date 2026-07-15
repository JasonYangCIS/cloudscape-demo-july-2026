// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Theme } from '@cloudscape-design/components/theming';

import './creative-fonts.module.scss';

const NEON_MAGENTA = '#ff2ecc';
const NEON_CYAN = '#2ee6ff';
const AMBER = '#ffb020';
const NAVY_DEEPEST = '#0b0620';
const NAVY_DEEP = '#140a33';
const NAVY_MID = '#1c0f45';
const NAVY_LIGHT = '#2a1660';

export const creativeTheme: Theme = {
  tokens: {
    // Fonts — techno display headings, readable techno body text
    fontFamilyHeading: '"Orbitron", sans-serif',
    fontFamilyDisplay: '"Orbitron", sans-serif',
    fontFamilyBase: '"Chakra Petch", sans-serif',

    // Backgrounds — deep navy/purple panels
    colorBackgroundLayoutMain: NAVY_DEEPEST,
    colorBackgroundContainerContent: NAVY_DEEP,
    colorBackgroundContainerHeader: NAVY_MID,
    colorBackgroundInputDefault: NAVY_MID,
    colorBackgroundPopover: NAVY_MID,
    colorBackgroundCellShaded: NAVY_LIGHT,
    colorBackgroundDropdownItemDefault: NAVY_MID,
    colorBackgroundDropdownItemHover: NAVY_LIGHT,
    colorBackgroundDropdownItemSelected: NAVY_LIGHT,

    // Text — bright enough for contrast against dark backgrounds
    colorTextBodyDefault: '#eaf0ff',
    colorTextBodySecondary: '#b6b2e0',
    colorTextHeadingDefault: '#ffffff',
    colorTextHeadingSecondary: NEON_CYAN,
    colorTextLabel: '#c9c4f0',
    colorTextLinkDefault: NEON_CYAN,
    colorTextLinkHover: AMBER,
    colorTextInteractiveDefault: '#eaf0ff',
    colorTextInteractiveHover: NEON_CYAN,
    colorTextInteractiveActive: NEON_MAGENTA,
    colorTextAccent: NEON_MAGENTA,

    // Borders — neon-tinted
    colorBorderDividerDefault: '#3d2a7a',
    colorBorderDividerSecondary: '#3d2a7a',
    colorBorderContainerTop: NEON_MAGENTA,
    colorBorderInputDefault: '#4a3690',
    colorBorderInputFocused: NEON_CYAN,
    colorBorderDropdownContainer: NEON_MAGENTA,

    // Primary buttons — neon magenta
    colorBackgroundButtonPrimaryDefault: NEON_MAGENTA,
    colorBackgroundButtonPrimaryHover: '#ff5cdb',
    colorBackgroundButtonPrimaryActive: '#d90fac',
    colorBorderButtonPrimaryDefault: NEON_MAGENTA,
    colorBorderButtonPrimaryHover: '#ff5cdb',
    colorBorderButtonPrimaryActive: '#d90fac',
    colorTextButtonPrimaryDefault: NAVY_DEEPEST,

    // Shape — sharp, angular, digital-panel look
    borderRadiusButton: '2px',
    borderRadiusContainer: '4px',
    borderRadiusInput: '2px',

    // Charts — magenta / cyan / amber palette
    colorChartsPaletteCategorical1: NEON_MAGENTA,
    colorChartsPaletteCategorical2: NEON_CYAN,
    colorChartsThresholdInfo: AMBER,
  },
};

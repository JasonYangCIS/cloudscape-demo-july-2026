// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import PropertyFilter, { PropertyFilterProps } from '@cloudscape-design/components/property-filter';

const filteringProperties: PropertyFilterProps.FilteringProperty[] = [
  { key: 'state', propertyLabel: 'State', groupValuesLabel: 'State values', operators: ['=', '!='] },
  { key: 'owner', propertyLabel: 'Owner', groupValuesLabel: 'Owner values', operators: [':', '!:'] },
];

function PropertyFilterExample() {
  const [query, setQuery] = useState<PropertyFilterProps.Query>({ tokens: [], operation: 'and' });

  return (
    <PropertyFilter
      query={query}
      onChange={({ detail }) => setQuery(detail)}
      filteringProperties={filteringProperties}
      filteringPlaceholder="Search"
      filteringAriaLabel="Filter instances"
      countText="10 matches"
    />
  );
}

const meta: Meta<typeof PropertyFilter> = {
  title: 'Forms/PropertyFilter',
  component: PropertyFilter,
};

export default meta;

type Story = StoryObj<typeof PropertyFilter>;

export const Default: Story = {
  render: () => <PropertyFilterExample />,
};

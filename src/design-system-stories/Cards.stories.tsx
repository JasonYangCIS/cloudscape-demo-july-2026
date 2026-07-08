// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Cards, { CardsProps } from '@cloudscape-design/components/cards';
import Header from '@cloudscape-design/components/header';

interface Item {
  number: number;
  text: string;
}

const cardDefinition: CardsProps.CardDefinition<Item> = {
  header: item => item.text,
  sections: [
    { id: 'description', header: 'Number', content: item => item.number },
    { id: 'type', header: 'Text', content: item => item.text },
  ],
};

const items: Item[] = [
  { number: 0, text: 'One' },
  { number: 1, text: 'Two' },
];

const meta: Meta<typeof Cards> = {
  title: 'Design System/Cards',
  component: Cards,
};

export default meta;

type Story = StoryObj<typeof Cards>;

export const Default: Story = {
  render: () => <Cards<Item> items={items} cardDefinition={cardDefinition} header={<Header>Cards header</Header>} />,
};

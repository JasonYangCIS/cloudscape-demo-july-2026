// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import DateRangePicker, { DateRangePickerProps } from '@cloudscape-design/components/date-range-picker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Design System/DateRangePicker',
  component: DateRangePicker,
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  render: () => {
    function Example() {
      const [value, setValue] = React.useState<DateRangePickerProps.Value | null>(null);

      return (
        <DateRangePicker
          onChange={({ detail }) => setValue(detail.value)}
          value={value}
          relativeOptions={[
            { key: 'previous-5-minutes', amount: 5, unit: 'minute', type: 'relative' },
            { key: 'previous-1-hour', amount: 1, unit: 'hour', type: 'relative' },
            { key: 'previous-6-hours', amount: 6, unit: 'hour', type: 'relative' },
          ]}
          isValidRange={range => {
            if (range?.type === 'absolute') {
              const [start, end] = [new Date(range.startDate), new Date(range.endDate)];
              if (start.getTime() > end.getTime()) {
                return {
                  valid: false,
                  errorMessage: 'The selected date range is invalid. The start date must be before the end date.',
                };
              }
            }
            return { valid: true };
          }}
          i18nStrings={{
            relativeModeTitle: 'Relative range',
            absoluteModeTitle: 'Absolute range',
            relativeRangeSelectionHeading: 'Choose a range',
            cancelButtonLabel: 'Cancel',
            applyButtonLabel: 'Apply',
            clearButtonLabel: 'Clear and dismiss',
            formatRelativeRange: ({ amount, unit }) => `Last ${amount} ${unit}${amount === 1 ? '' : 's'}`,
          }}
          placeholder="Filter by a date and time range"
        />
      );
    }
    return <Example />;
  },
};

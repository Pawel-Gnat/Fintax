'use client';

import React, { PureComponent } from 'react';
import {
  PieChart as PieChartLib,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Location } from '@prisma/client';
import { SafeEmployee } from '@/types/types';

interface PieChartProps {
  locations: Location[];
  employees: SafeEmployee[];
}

export default class PieChart extends PureComponent<PieChartProps> {
  render() {
    const locations = this.props.locations;
    const employees = this.props.employees;

    const pieColors = [
      'rgba(75, 80, 93, 1)',
      'rgba(75, 80, 93, 0.8)',
      'rgba(75, 80, 93, 0.6)',
      'rgba(75, 80, 93, 0.4)',
    ];

    const chartData = locations.map((location, index) => {
      const employeeCount = employees.reduce((acc, employee) => {
        if (employee.locationId === location.id) {
          acc += 1;
        }
        return acc;
      }, 0);

      const colorIndex = index % pieColors.length;

      return {
        name: location.name,
        value: employeeCount,
        fill: pieColors[colorIndex],
      };
    });

    if (locations.length === 0 || employees.length === 0) {
      return (
        <p className="my-5 text-center">
          Your location chart is currently not available. Please assign employees to
          corresponding locations.
        </p>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="40%" minHeight={250}>
        <PieChartLib width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChartLib>
      </ResponsiveContainer>
    );
  }
}

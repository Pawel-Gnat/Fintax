'use client';

import React, { PureComponent } from 'react';
import {
  BarChart as BarChartLib,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { SafeEmployee, SafeSettlement } from '@/types/types';

interface BarChartProps {
  settlements: SafeSettlement[];
  employees: SafeEmployee[];
}

export default class BarChart extends PureComponent<BarChartProps> {
  render() {
    const settlements = this.props.settlements;
    const employees = this.props.employees;

    const chartData = employees.map((employee) => {
      const employeeSettlements = settlements.filter(
        (settlement) => settlement.employeeId === employee.id,
      );

      return {
        fullName: `${employee.name} ${employee.surname}`,
        'Managed Settlements': employeeSettlements.length,
      };
    });

    return (
      <ResponsiveContainer width="100%" height="60%">
        <BarChartLib
          width={500}
          height={100}
          data={chartData}
          margin={{
            top: 30,
            right: 10,
            left: 10,
            bottom: 120,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fullName" angle={-90} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey={'Managed Settlements'}
            fill="#4b505d"
            activeBar={<Rectangle fill="#d9a21b" stroke="#4b505d" />}
          />
        </BarChartLib>
      </ResponsiveContainer>
    );
  }
}

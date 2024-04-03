'use client';

import React, { PureComponent } from 'react';
import {
  BarChart as BarChartLib,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { SafeClient, SafeEmployee } from '@/types/types';

interface BarChartProps {
  clients: SafeClient[];
  employees: SafeEmployee[];
}

export default class BarChart extends PureComponent<BarChartProps> {
  render() {
    const clients = this.props.clients;
    const employees = this.props.employees;

    const chartData = employees.map((employee) => {
      const employeeClients = clients.filter(
        (client) => client.employeeId === employee.id,
      );

      return {
        fullName: `${employee.name} ${employee.surname}`,
        'Managed Clients': employeeClients.length,
      };
    });

    if (clients.length === 0 || employees.length === 0) {
      return (
        <p className="my-5 text-center">
          Your settlement chart is currently not available. Please assign companies to
          corresponding employees.
        </p>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="60%" minHeight={500}>
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
            dataKey={'Managed Clients'}
            fill="#4b505d"
            activeBar={<Rectangle fill="#d9a21b" stroke="#4b505d" />}
          />
        </BarChartLib>
      </ResponsiveContainer>
    );
  }
}

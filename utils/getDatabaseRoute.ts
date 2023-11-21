const getDatabaseRoute = (databaseName: string, elementId: string) => {
  if (databaseName === 'departments') {
    return `/api/departments/${elementId}`;
  }

  if (databaseName === 'locations') {
    return `/api/locations/${elementId}`;
  }

  if (databaseName === 'employees') {
    return `/api/employees/${elementId}`;
  }

  if (databaseName === 'settlements') {
    return `/api/settlements/${elementId}`;
  }

  return '';
};

export default getDatabaseRoute;

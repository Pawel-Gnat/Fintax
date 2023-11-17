const getDatabaseRoute = (databaseName: string, elementName: string) => {
  if (databaseName === 'departments') {
    return `/api/departments/${elementName}`;
  }

  if (databaseName === 'locations') {
    return `/api/locations/${elementName}`;
  }

  return '';
};

export default getDatabaseRoute;

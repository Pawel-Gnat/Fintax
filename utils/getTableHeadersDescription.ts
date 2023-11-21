const getTableHeadersDescription = (databaseName: string) => {
  if (databaseName === 'locations') {
    return ['Location'];
  }

  if (databaseName === 'departments') {
    return ['Department'];
  }

  if (databaseName === 'employees') {
    return ['Employee', 'Department', 'Location', 'Managed companies'];
  }

  if (databaseName === 'settlements') {
    return ['Settlement', 'Location', 'Employee'];
  }

  return [];
};

export default getTableHeadersDescription;

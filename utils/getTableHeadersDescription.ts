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

  return [];
};

export default getTableHeadersDescription;

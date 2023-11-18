const getTableHeadersDescription = (databaseName: string) => {
  if (databaseName === 'locations') {
    return ['Location'];
  }

  if (databaseName === 'departments') {
    return ['Department'];
  }

  if (databaseName === 'employees') {
    return ['Employee', 'Role', 'Location', 'Managed companies'];
  }

  return [];
};

export default getTableHeadersDescription;

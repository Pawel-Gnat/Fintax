const getTitle = (databaseName: string) => {
  if (databaseName === 'locations') {
    return 'location';
  }

  if (databaseName === 'departments') {
    return 'department';
  }

  if (databaseName === 'employees') {
    return 'employee';
  }
};

export default getTitle;

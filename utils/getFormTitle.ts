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

  if (databaseName === 'settlements') {
    return 'settlement';
  }
};

export default getTitle;

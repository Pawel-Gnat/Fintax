const getDescription = (databaseName: string) => {
  if (databaseName === 'locations') {
    return 'Add new location with the following information to include it in the general list of locations.';
  }

  if (databaseName === 'departments') {
    return 'Add new department with the following information to include it in the general list of departments.';
  }

  if (databaseName === 'employees') {
    return 'Add new employee with the following informations to create a new access and add it to the general list of employees.';
  }
};

export default getDescription;

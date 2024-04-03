const getDescription = (action: string) => {
  if (action === 'setLocation') {
    return 'Add new location with the following information to include it in the general list of locations.';
  }

  if (action === 'setDepartment') {
    return 'Add new department with the following information to include it in the general list of departments.';
  }

  if (action === 'setEmployee') {
    return 'Add new employee with the following informations to create a new access and add it to the general list of employees.';
  }

  if (action === 'setClient') {
    return 'Add new client with the following information to include it in the general list of clients.';
  }
};

export default getDescription;

const getTitle = (title: string) => {
  if (title === 'Locations') {
    return 'location';
  }

  if (title === 'Departments') {
    return 'department';
  }

  if (title === 'Employees') {
    return 'employee';
  }
};

export default getTitle;

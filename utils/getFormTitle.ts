const getTitle = (action: string) => {
  if (action === 'setLocation') {
    return 'location';
  }

  if (action === 'setDepartment') {
    return 'department';
  }

  if (action === 'setEmployee') {
    return 'employee';
  }

  if (action === 'setSettlement') {
    return 'settlement';
  }
};

export default getTitle;

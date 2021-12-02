import sortBy from 'lodash/sortBy';

function appendEmployee(arr, newEmployee) {
  let employeeData = { ...newEmployee };
  if (newEmployee.superior === null) arr.push(employeeData);
  else {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === newEmployee.superior) {
        arr[i].subordinates.push(employeeData);
      } else if (arr[i].subordinates.length > 0) {
        appendEmployee(arr[i].subordinates, newEmployee);
      }
    }
  }
  return arr;
}

function deepSort(arr, column) {
  arr = sortBy(arr, column);
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].subordinates.length > 0) {
      arr[i].subordinates = deepSort(arr[i].subordinates, column);
    }
  }
  return arr;
}

function flatten(arr) {
  var list = [];
  for (var i = 0; i < arr.length; i++) {
    list = list.concat([
      {
        id: arr[i].id,
        name: arr[i].name,
      },
    ]);
    if (arr[i].subordinates.length > 0) {
      list = list.concat(flatten(arr[i].subordinates));
    }
  }
  return sortBy(list, 'name');
}

export { appendEmployee, deepSort, flatten };

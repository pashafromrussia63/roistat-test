import Vue from 'vue';
import _ from 'underscore';

function appendEmployee(arr, newEmployee) {
  let employeeData = { ...newEmployee };
  if (newEmployee.superior === null) arr.push(employeeData);
  else {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === newEmployee.superior) {
        if ('subordinates' in arr[i]) arr[i].subordinates.push(employeeData);
        else Vue.set(arr[i], 'subordinates', [employeeData]);
      } else if ('subordinates' in arr[i]) {
        appendEmployee(arr[i].subordinates, newEmployee);
      }
    }
  }
  return arr;
}

function deepSort(arr, column) {
  arr = _.sortBy(arr, column);
  for (var i = 0; i < arr.length; i++) {
    if ('subordinates' in arr[i]) {
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
    if ('subordinates' in arr[i]) {
      list = list.concat(flatten(arr[i].subordinates));
    }
  }
  return _.sortBy(list, 'name');
}

export { appendEmployee, deepSort, flatten };

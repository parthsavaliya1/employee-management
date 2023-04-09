import {
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  EMPLOYEE_LIST,
  EMPLOYEE_LEAVE_LIST,
} from "./employeeTypes";

const initialState = {
  employees: [],
  error: null,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST:
      return {
        ...state,
        employees: action.data,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.employee],
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) => {
          if (employee.id === action.id) {
            return { ...employee, ...action.employee };
          }
          return employee;
        }),
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.id
        ),
      };
    case EMPLOYEE_LEAVE_LIST:
      return {
        ...state,
        employeeLeave: action.data,
      };
    default:
      return state;
  }
};

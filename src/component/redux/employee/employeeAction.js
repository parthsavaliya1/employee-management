import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE, EMPLOYEE_LIST, EMPLOYEE_LEAVE_LIST} from './employeeTypes';

export const addEmployee = (employee) => {
    return {
        type: ADD_EMPLOYEE,
        employee
    }
}

export const addEmployeeList = (employee) => {
    return {
        type: EMPLOYEE_LIST,
        data:employee
    }
}

export const addEmployeeLeaveList = (employeeLeave) => {
    return {
        type: EMPLOYEE_LEAVE_LIST,
        data:employeeLeave
    }
}

export const updateEmployee = (id, employee) => {
    return {
        type: UPDATE_EMPLOYEE,
        id,
        employee
    }
}

export const deleteEmployee = (id) => {
    return {
        type: DELETE_EMPLOYEE,
        id
    }
}

import React from 'react'
import { connect } from 'react-redux';
import Popup from '../Popup';
import { formateDate } from '../../utils';

function EmployeeList({setDeletedId,deleteId,  handleEdit, handleDelete,handleAddLave,handleViewLeave,employees }) {

    return (
        <div className='contain-table'>
            <table className='table-main'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Date</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                        <th colSpan={2} className="text-center">
                            Leave Action
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, i) => (
                            <tr key={employee.userId}>
                                <td>{i + 1}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{(employee.phoneNumber)}</td>
                                <td>{formateDate(employee.birthDate)} </td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(employee.userId)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="text-left">
                                    <button
                                        onClick={() => setDeletedId(employee?.userId)}
                                        className="button delete-btn muted-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="text-right">
                                    <button
                                        className="button muted-button"
                                        onClick={() => handleViewLeave(employee?.userId)}
                                    >
                                        View
                                    </button>
                                </td>
                                <td className="text-left">
                                    <button
                                    onClick={() => handleAddLave(employee?.userId)}
                                        className="button muted-button"
                                    >
                                        Add
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr key={employees?.id}>
                            <td colSpan={12}>No Employees</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {deleteId && (
                <Popup handleCancel={() => setDeletedId(null)} handleDelete={() => handleDelete(deleteId)} title={'Delete Employee'}/>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    employees: state.employees?.employees ,
  });
  
export default connect(mapStateToProps)(EmployeeList);


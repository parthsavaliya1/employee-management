import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Header from "./Header";
import List from "../Employee/EmployeeList";
import Add from "../Employee/AddEmployee";
import Edit from "../Employee/EditEmployee";

import { useDispatch } from "react-redux";
import { addEmployeeList, deleteEmployee } from "../redux";
import {
  deleteEmployeeById,
  getAllEmployeeData,
  getLeaveByUserId,
} from "../../api";
import AddLeave from "../Leave/AddLeave";
import ViewLeave from "../Leave/ViewLeave";

function Dashboard() {
  const dispatch = useDispatch();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleteId, setDeletedId] = useState(null)
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddLeave, setIsAddLeave] = useState(false)
  const [isViewLeave, setIsViewLeave] = useState(null)
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeLeave, setEmployeeLeave] = useState([])


  useEffect(()=> {
    getAllEmployeeList();
  },[])

  const getAllEmployeeList=() => {
    getAllEmployeeData().then((resp) => {
      dispatch(addEmployeeList(resp.data));
      setEmployeeData(resp?.data);
    }).catch(error => toast.error('Error while fetch data'));
  }

  const handleEdit = (id) => {
    const [employee] = employeeData.filter((employee) => employee.userId === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleViewLeave = (id) => {
    const [employee] = employeeData.filter((employee) => employee.userId === id);
    setSelectedEmployee(employee);
    getLeaveByUserId(id).then((resp) => {
      if(resp?.data) {
        setEmployeeLeave(resp?.data)
        setIsViewLeave(true)
      }
    }).catch((error) => toast.error('Something went wrong!'))
  }

  const handleAddLave = (id) => {
    const [employee] = employeeData.filter((employee) => employee.userId === id);
    setSelectedEmployee(employee);
    setIsAddLeave(true);
  }

  const handleDelete = (userId) => {
    deleteEmployeeById(userId).then((resp) => {
      if (resp?.status === 200) {
        const findIndex = employeeData?.findIndex((e) => e.userId === userId);
        employeeData.splice(findIndex, 1);
        setDeletedId(null)
        dispatch(addEmployeeList(employeeData))
        dispatch(deleteEmployee(userId));
      }
    }).catch((error) => toast.error('Error while delete employee'));
  };

  return (
    <div className="container">
      {/* List */}
      {!isAdding && !isEditing && !isAddLeave && (
        <>
          <Header setIsAdding={setIsAdding} />
          <List setDeletedId={setDeletedId} deleteId={deleteId} handleEdit={handleEdit} handleDelete={handleDelete} handleAddLave={handleAddLave} handleViewLeave={handleViewLeave}/>
        </>
      )}
      {/* Add */}
      {isAdding && <Add setIsAdding={setIsAdding} />}
      {/* Edit */}
      {isEditing && (
        <Edit selectedEmployee={selectedEmployee} setIsEditing={setIsEditing} />
      )}
      {isAddLeave && <AddLeave selectedEmployee={selectedEmployee} setIsAddLeave={setIsAddLeave}/>}
      {isViewLeave && <ViewLeave selectedEmployee={selectedEmployee} employeeLeave={employeeLeave} setIsViewLeave={setIsViewLeave}/>}
    </div>
  );
}

export default Dashboard;

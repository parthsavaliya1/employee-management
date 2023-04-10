import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteLeaveById } from "../../api";
import Popup from "../Popup";
import { formateDate } from "../../utils";
import {  useDispatch } from "react-redux";
import { addEmployeeLeaveList } from "../redux";

function ViewLeave({  setIsViewLeave,employeesLeaveData}) {
    const [leaveId, setLeaveId] = useState(null)
    const dispatch = useDispatch();

    const handleDeleteLeave = () => {
        deleteLeaveById(leaveId).then((resp) => {
            if(resp?.status === 200) {
                setLeaveId(null)
                const findIndex = employeesLeaveData?.findIndex((e) => e.leaveId === leaveId)
                employeesLeaveData.splice(findIndex, 1);
                dispatch(addEmployeeLeaveList([...employeesLeaveData]));
                toast.success(resp?.message)
            }
        }).catch((error) => toast.error('Error when delete leave'))
    }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Leave Data</h4>
        </div>
        <div className="modal-body">
          {" "}
          <div className="contain-table">
            <table className="table-main">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Leave Type</th>
                  <th>Leave Reason</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th className="text-center">
                    Actions
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {employeesLeaveData?.length > 0 ? (
                  employeesLeaveData.map((leave, i) => (
                    <tr key={leave.leaveId}>
                      <td>{i + 1}</td>
                      <td>{leave.leaveType}</td>
                      <td>{leave.reason}</td>
                      <td>{formateDate(leave.startDate)}</td>
                      <td>{formateDate(leave.endDate)}</td>
                      
                      <td className="text-left">
                        <button
                          onClick={() => setLeaveId(leave?.leaveId)}
                          className="button delete-btn muted-button"
                        >
                          Delete
                        </button>
                      </td>
                     
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No Leave Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={() => setIsViewLeave(false)} className="button">Close</button>
        </div>
      </div>
      {leaveId && (
        <Popup title={"Delete Leave"} handleCancel={() => setLeaveId(null)} handleDelete={handleDeleteLeave}/>
      )}
    </div>
  );
}


export default ViewLeave
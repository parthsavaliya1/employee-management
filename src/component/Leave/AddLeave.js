import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { createLeave } from "../../api";

export default function AddLeave({ setIsAddLeave, selectedEmployee }) {
  const [formData, setFormData] = useState({
    leaveType: "",
    reason: "",
    startDate: "",
    endDate: "",
  });

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleSetField = (event) => {
    const name = event?.target?.name;
    const value = event?.target?.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckValidate = () => {
    return !leaveType || !reason || !startDate || !endDate;
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const leaveData = {
      leaveType,
      reason,
      startDate,
      endDate,
      userId: selectedEmployee?.userId,
    };

    createLeave(leaveData)
      .then((resp) => {
        if (resp?.data) {
          setIsAddLeave(false);
          toast.success("Add Leave Successfully");
        }
      })
      .catch((error) => toast.error("Something went wrong!"));

  };

  const { leaveType, reason, startDate, endDate } = formData || {};

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Leave</h1>
        <label htmlFor="firstName">Leave Type</label>

        <select onChange={(e) => handleSetField(e)} name="leaveType" id="leave">
          <option value={""}>Select Leave</option>
          <option value="SICK_LEAVE">Sick Leave</option>
          <option value="CASUAL_LEAVE">Casual Leave</option>
        </select>
        <label htmlFor="lastName">Reason</label>
        <input
          id="reason"
          type="text"
          placeholder="Enter Leave Reason Here"
          ref={textInput}
          name="reason"
          value={reason}
          onChange={(e) => handleSetField(e)}
        />
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          placeholder="Select Leave From"
          ref={textInput}
          name="startDate"
          value={startDate}
          onChange={(e) => handleSetField(e)}
        />
        <label htmlFor="endDate">End Date</label>
        <input
          id="endDate"
          type="date"
          placeholder="Select Leave To"
          ref={textInput}
          name="endDate"
          value={endDate}
          onChange={(e) => handleSetField(e)}
        />
        <div style={{ marginTop: "30px" }}>
          <input
            type="submit"
            disabled={handleCheckValidate()}
            className={`add-btn ${handleCheckValidate() ? "disable-btn" : ""}`}
            value="Add"
          />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button cancel-btn"
            type="button"
            value="Cancel"
            onClick={() => setIsAddLeave(false)}
          />
        </div>
      </form>
    </div>
  );
}

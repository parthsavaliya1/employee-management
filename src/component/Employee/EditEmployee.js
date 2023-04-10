import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect, useDispatch } from "react-redux";
import { addEmployeeList, updateEmployee } from "../redux";
import { updateEmployeeById } from "../../api";
import { formateDate } from "../../utils";

function EditEmployee({ selectedEmployee, setIsEditing,employees }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: selectedEmployee?.firstName,
    lastName: selectedEmployee?.lastName,
    email: selectedEmployee?.email,
    phoneNumber: selectedEmployee?.phoneNumber,
    birthDate: selectedEmployee?.birthDate,
  });
  const [isError, setIsError] = useState(true);

  const { firstName, lastName, email, phoneNumber, birthDate } = formData || {};

  const handleUpdate = (e) => {
    e.preventDefault();

    const updateEmployeeData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
    };

    const isUnique = employees?.filter((em) => (em.email ===updateEmployeeData?.email || em.phoneNumber === updateEmployeeData?.phoneNumber) && selectedEmployee?.userId !== em.userId )
    if(isUnique?.length > 0) {
        toast.error("Employee already exists with same email or phone");
        return;
    }

    updateEmployeeById(selectedEmployee?.userId,updateEmployeeData).then((resp) => {
        if(resp?.data) {
          updateEmployeeData.userId = selectedEmployee?.userId;
          const findIndex = employees?.findIndex((e)=> e.userId === selectedEmployee.userId);
          employees[findIndex] = updateEmployeeData;
            dispatch(updateEmployee(selectedEmployee?.userId, updateEmployeeData));
            dispatch(addEmployeeList([...employees]))
            setIsEditing(false);
        }
    }).catch((error) => toast.error('Error while update employee'))
  };

  const handleSetField = (event, type) => {
    const name = event.target.name;
    const value = event.target.value;
    if (type === "email") {
      const regEx =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (regEx?.test(value) || value === "") {
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckValidate = () => {
    return !firstName || !lastName || !email || !phoneNumber || !birthDate;
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => handleSetField(e)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => handleSetField(e)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => handleSetField(e, "email")}
        />
        {!isError && <span className="error-msg">Email is not valid</span>}

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="number"
          name="phoneNumber"
          minLength={0}
          maxLength={10}
          value={phoneNumber}
          onChange={(e) => handleSetField(e)}
        />
        <label htmlFor="birthDate">Birth Date</label>
        <input
          id="birthDate"
          type="date"
          name="birthDate"
          value={formateDate(birthDate)}
          onChange={(e) => handleSetField(e)}
        />
        <div style={{ marginTop: "30px" }}>
          <input
            type="submit"
            className={`add-btn ${
              handleCheckValidate() || !isError ? "disable-btn" : ""
            }`}
            disabled={handleCheckValidate() || !isError}
            value="Update"
          />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button cancel-btn"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
    employees: state.employees?.employees,
  });
  
  export default connect(mapStateToProps)(EditEmployee);
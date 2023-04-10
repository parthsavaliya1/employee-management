import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

import { connect, useDispatch } from "react-redux";
import { addEmployee, addEmployeeList } from "../redux";
import { createEmployee } from "../../api";

function AddEmployee({ setIsAdding, employees }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
  });
  const [isError, setIsError] = useState(true);
  const { firstName, lastName, email, phoneNumber, birthDate } = formData || {};
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const newEmployee = {
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
    };

    const isUnique = employees?.filter((em) => em.email ===newEmployee?.email || em.phoneNumber === newEmployee?.phoneNumber )
    if(isUnique?.length > 0) {
        toast.error("Employee already exists with same email or phone");
        return;
    }

    createEmployee(newEmployee)
      .then((resp) => {
        if (resp?.data) {
          employees?.push(resp?.data)
          dispatch(addEmployee(newEmployee));
          dispatch(addEmployeeList([...employees]))
          setIsAdding(false);
        }
      })
      .catch((error) => toast.error('Error while create employee'));
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
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          placeholder="Enter FirstName Here"
          ref={textInput}
          name="firstName"
          value={firstName}
          onChange={(e) => handleSetField(e)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Enter LastName Here"
          value={lastName}
          onChange={(e) => handleSetField(e)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter Email Here"
          value={email}
          onChange={(e) => handleSetField(e, "email")}
        />
        {!isError && <span className="error-msg">Email is not valid</span>}
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="number"
          name="phoneNumber"
          placeholder="Enter PhoneNumber Here"
          maxLength={10}
          minLength={0}
          value={phoneNumber}
          onChange={(e) => handleSetField(e)}
        />
        <label htmlFor="birthDate">Birth Date</label>
        <input
          id="birthDate"
          type="date"
          name="birthDate"
          placeholder="Enter BirthDate Here"
          value={birthDate}
          onChange={(e) => handleSetField(e)}
        />
        <div style={{ marginTop: "30px" }}>
          <input
            type="submit"
            disabled={handleCheckValidate() || !isError}
            className={`add-btn ${
              handleCheckValidate() || !isError ? "disable-btn" : ""
            }`}
            value="Add"
          />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button cancel-btn"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  employees: state.employees?.employees,
});

export default connect(mapStateToProps)(AddEmployee);

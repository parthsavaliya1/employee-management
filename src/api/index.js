import axios from "axios";


/* Employee API */

export const getAllEmployeeData = async () => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `http://localhost:5000/api/users/get-all`,
      })
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };

  export const createEmployee = async (data) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `http://localhost:5000/api/users/create`,
        data,
      })
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };

  export const updateEmployeeById = async (id,data) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: `http://localhost:5000/api/users/update/${id}`,
        data,
      })
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };

  export const deleteEmployeeById = async (id) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `http://localhost:5000/api/users/delete/${id}`,
      })
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };


  /* Leave API */

  export const getAllLeaveData = async () => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `http://localhost:5000/api/users-leaves/get-all`,
      })
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };



  export const getLeaveByUserId = async (id) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `http://localhost:5000/api/users-leaves/${id}`,
      })
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };


  export const createLeave = async (data) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `http://localhost:5000/api/users-leaves/create`,
        data,
      })
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };


  export const deleteLeaveById = async (id) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `http://localhost:5000/api/users-leaves/delete/${id}`,
      })
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };

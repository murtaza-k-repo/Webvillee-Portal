import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Image } from "react-bootstrap";
import { BiPlus, BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../../assets/img/user.png";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
// import { Select } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Box } from "@mui/material";
import { Chip } from "@mui/material";
import { MenuItem } from "@mui/material";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Users = () => {
  const [rows, setRows] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    picture: "",
    first_name: "",
    last_name: "",
    email: "",
    empID: "",
    department_id: "",
    role: "",
    technology: "",
    user_reporting_manager: "",
  });
  const [departments, setDepartments] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState([]);
  const [roles, setRoles] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteID] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const animatedComponents = makeAnimated();

  const columns = [
    {
      name: "photo",
      label: "#",
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "employeeID",
      label: "Employee ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "department",
      label: "Department",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "technology",
      label: "Technology",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "manager",
      label: "Reporting Manager",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "actions",
      label: "ACTIONS",
    },
  ];

  const getAllDepartments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/all/getAllDepartments`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setDepartments(response.data.data);
      } else {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getRoles = async (deptId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/all/getRoleByDepartmentId/${deptId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setRoles(response?.data?.data);
      } else {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/all/getAllUsers`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status === 200) {
        let temp = response?.data?.data?.map((row, index) => ({
          photo: (
            <img
              className="rounded-circle"
              height={50}
              width={50}
              src={avatar}
              alt={`${row?.user_first_name}`}
            />
          ),
          id: row?._id,
          name: `${row?.user_first_name} ${row?.user_last_name}`,
          email: row?.user_email,
          employeeID: row?.user_empid,
          department: row?.department,
          role: row?.role,
          manager: row?.reporting_manager_name,
          technology:
            row?.user_technology_name?.length > 0
              ? row?.user_technology_name?.join(", ")
              : "NA",

          actions: (
            <>
              <Button
                className="text-success"
                variant="outlined"
                onClick={() => {
                  setShowUpdateModal(true);
                  setUpdateData({
                    id: row?._id,
                    picture: row?.user_profile_picture,
                    first_name: row?.user_first_name,
                    last_name: row?.user_last_name,
                    email: row?.user_email,
                    empID: row?.user_empid,
                    department_id: row?.department_id,
                    role: row?.role_id,
                    technology:
                      row?.user_technology_name &&
                      row?.user_technology_name?.map((technology) => ({
                        value: technology,
                        label: technology,
                      })),
                    user_reporting_manager: row?.user_reporting_manager,
                  });
                }}
              >
                <BiSolidPencil size={22} />
              </Button>
              <Button
                className="text-danger"
                variant="outlined"
                onClick={() => {
                  setShowDeleteModal(true);
                  setDeleteID(row?._id);
                }}
              >
                <MdDelete size={22} />
              </Button>
            </>
          ),
        }));

        setRows(temp);
      } else {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/all/createUser`,
        {
          user_first_name: event.target[0].value,
          user_last_name: event.target[1].value,
          user_empid: event.target[2].value,
          user_email: event.target[3].value,
          user_technology_name:
            selectedTechnology &&
            selectedTechnology?.map((technology) => technology.value),
          department_id: event.target[4].value,
          role_id: event.target[5].value,
          user_reporting_manager: event.target[6].value,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setShow(false);
        getAllUsers();
        toast.success("User added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_profile_picture", updateData?.picture);
    formData.append("user_first_name", updateData?.first_name);
    formData.append("user_last_name", updateData?.last_name);
    formData.append("user_email", updateData?.email);
    formData.append("user_empid", updateData?.empID);
    formData.append("department_id", updateData?.department_id);
    formData.append("role_id", updateData?.role);
    formData.append(
      "user_technology_name",
      updateData?.technology &&
        updateData?.technology?.map((technology) => technology.value)
    );
    formData.append(
      "user_reporting_manager",
      updateData?.user_reporting_manager
    );

    try {
      let response = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/api/all/updateUser/${updateData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setShowUpdateModal(false);
        getAllUsers();
        toast.success("User updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getAllTechnologies = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/all/getAllTechnologies`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setTechnologies(response?.data?.data);
      } else {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      // let response = await axios.delete(
      //   `${process.env.REACT_APP_API_ENDPOINT}/hrDelete/${id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${user?.token}`,
      //     },
      //   }
      // );

      // if (response.status === 200) {
      //   getRoles();
      setShowDeleteModal(false);
      // }
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getAllDepartments();
    getAllTechnologies();
    getAllUsers();

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (updateData?.department_id?.length > 0) {
      getRoles(updateData?.department_id);
    }

    //eslint-disable-next-line
  }, [updateData?.department_id]);

  return (
    <>
      <ToastContainer />
      <MUIDataTable
        className={"mt-4 mb-3"}
        title={"Roles"}
        data={rows || []}
        columns={columns}
        options={{
          selectableRows: false,
          filter: false,
          download: false,
          print: false,
          viewColumns: false,
          responsive: "scroll",
          rowsPerPage: 5,
          rowsPerPageOptions: [5, 10, 15],
          customToolbar: () => (
            <BiPlus
              onClick={() => setShow(true)}
              className="text-secondary cursor-pointer"
              size={30}
            />
          ),
        }}
      />

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group mb-2">
              <small>First Name:</small>
              <input
                type="text"
                className="form-control"
                id="firstName"
                aria-describedby="firstName"
                placeholder="Enter first name"
              />
            </div>
            <div className="form-group mb-2">
              <small>Last Name:</small>
              <input
                type="text"
                className="form-control"
                id="lastName"
                aria-describedby="lastName"
                placeholder="Enter last name"
              />
            </div>
            <div className="form-group mb-2">
              <small>Employee ID:</small>
              <input
                type="text"
                className="form-control"
                id="empId"
                aria-describedby="empId"
                placeholder="Enter employee Id"
              />
            </div>
            <div className="form-group mb-2">
              <small>Email:</small>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="email"
                placeholder="Enter email address"
              />
            </div>
            <div className="form-group">
              <small>Department:</small>
              <select
                className="form-select mb-2"
                id="department"
                required
                onChange={(e) => getRoles(e.target.value)}
              >
                <option disabled selected value={""}>
                  Select department
                </option>
                {departments &&
                  departments?.map((department) => {
                    return (
                      <option value={department._id}>
                        {department.department_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group">
              <small>Role:</small>
              <select className="form-select mb-2" id="role" required>
                <option disabled selected value={""}>
                  Select role
                </option>
                {Object.keys(roles).length > 0 ? (
                  roles?.map((role) => {
                    return <option value={role._id}>{role.role_name}</option>;
                  })
                ) : (
                  <option value={""} disabled>
                    No roles!
                  </option>
                )}
              </select>
            </div>
            <div className="form-group">
              <small>Reporting Manager:</small>
              <select className="form-select mb-2" id="role" required>
                <option disabled selected value={""}>
                  Select reporting manager
                </option>
                {rows &&
                  rows?.map((row) => {
                    return <option value={row?.id}>{row?.name}</option>;
                  })}
              </select>
            </div>
            <div className="form-group">
              <FormControl sx={{ magin: 0, marginTop: "10px", width: "100%" }}>
                {/* <InputLabel id="demo-multiple-chip-label">
                  Technology
                </InputLabel> */}
                {/* <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  value={selectedTechnology}
                  onChange={(e) => setSelectedTechnology(e.target.value)}
                  multiple
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Technology"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((item) => (
                        <Chip key={item} label={item} />
                      ))}
                    </Box>
                  )}
                >
                  {technologies &&
                    technologies?.map((technology) => (
                      <MenuItem
                        key={technology?._id}
                        value={technology?.technology_name}
                      >
                        {technology?.technology_name}
                      </MenuItem>
                    ))}
                </Select> */}
                <Select
                  placeholder="Technologies..."
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  value={selectedTechnology}
                  onChange={(e) => setSelectedTechnology(e)}
                  isMulti
                  options={
                    technologies &&
                    technologies?.map((technology) => ({
                      value: technology.technology_name,
                      label: technology.technology_name,
                    }))
                  }
                />
              </FormControl>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button type="submit" className="addBtn" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showUpdateModal}>
        <Modal.Header>
          <Modal.Title>Update Department</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdate}>
          <Modal.Body>
            <div className="form-group mb-2">
              <small>First Name:</small>
              <input
                type="text"
                className="form-control"
                id="firstName"
                aria-describedby="firstName"
                placeholder="Enter first name"
                value={updateData?.first_name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, first_name: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-2">
              <small>Last Name:</small>
              <input
                type="text"
                className="form-control"
                id="lastName"
                aria-describedby="lastName"
                placeholder="Enter last name"
                value={updateData?.last_name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, last_name: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-2">
              <small>Employee ID:</small>
              <input
                type="text"
                className="form-control"
                id="empId"
                aria-describedby="empId"
                placeholder="Enter employee Id"
                value={updateData?.empID}
                onChange={(e) =>
                  setUpdateData({ ...updateData, empID: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-2">
              <small>Email:</small>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="email"
                placeholder="Enter email address"
                value={updateData?.email}
                onChange={(e) =>
                  setUpdateData({ ...updateData, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <small>Department:</small>
              <select
                className="form-select mb-2"
                id="department"
                required
                value={updateData?.department_id}
                onChange={(e) => {
                  setUpdateData({
                    ...updateData,
                    department_id: e.target.value,
                  });
                  getRoles(e.target.value);
                }}
              >
                <option disabled selected value={""}>
                  Select department
                </option>
                {departments &&
                  departments?.map((department) => {
                    return (
                      <option value={department._id}>
                        {department.department_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group">
              <small>Role:</small>
              <select
                className="form-select mb-2"
                id="role"
                required
                value={updateData?.role}
                onChange={(e) =>
                  setUpdateData({ ...updateData, role: e.target.value })
                }
              >
                <option disabled selected value={""}>
                  Select role
                </option>
                {Object.keys(roles).length > 0 ? (
                  roles?.map((role) => {
                    return <option value={role._id}>{role.role_name}</option>;
                  })
                ) : (
                  <option value={""} disabled>
                    No roles!
                  </option>
                )}
              </select>
            </div>
            <div className="form-group">
              <small>Reporting Manager:</small>
              <select
                className="form-select mb-2"
                id="role"
                required
                value={updateData?.user_reporting_manager}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    user_reporting_manager: e.target.value,
                  })
                }
              >
                <option disabled selected value={""}>
                  Select reporting manager
                </option>
                {rows &&
                  rows?.map((row) => {
                    return <option value={row?.id}>{row?.name}</option>;
                  })}
              </select>
            </div>
            <div className="form-group">
              <FormControl sx={{ magin: 0, marginTop: "10px", width: "100%" }}>
                {/* <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  value={updateData?.technology}
                  onChange={(e) => setUpdateData({...updateData, technology: e.target.value})}
                  multiple
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Technology"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((item) => (
                        <Chip key={item} label={item} />
                      ))}
                    </Box>
                  )}
                >
                  {technologies &&
                    technologies?.map((technology) => (
                      <MenuItem
                        key={technology?._id}
                        value={technology?.technology_name}
                      >
                        {technology?.technology_name}
                      </MenuItem>
                    ))}
                </Select> */}

                <Select
                  placeholder="Technologies..."
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  value={updateData?.technology}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, technology: e })
                  }
                  isMulti
                  options={
                    technologies &&
                    technologies?.map((technology) => ({
                      value: technology.technology_name,
                      label: technology.technology_name,
                    }))
                  }
                />
              </FormControl>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowUpdateModal(false)}
            >
              Close
            </Button>
            <Button type="submit" className="addBtn" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Users;

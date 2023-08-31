import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";

import { BiPlus, BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "./style.css";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MUIDataTable from "mui-datatables";
import { selectClasses } from "@mui/material";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Roles = () => {
  const [rows, setRows] = useState(null);
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [departments, setDepartments] = useState(null);
  const [updateData, setUpdateData] = useState({
    id: "",
    role_name: "",
    role_description: "",
    department_id: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteID] = useState("");

  const columns = [
    {
      name: "sno",
      label: "S.No.",
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
      name: "description",
      label: "Description",
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
      name: "actions",
      label: "ACTIONS",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const getRoles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/all/getAllRoles`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response?.data?.data);

        let temp = response?.data?.data?.map((row, index) => ({
          sno: index + 1,
          role: row?.role_name,
          description: row?.role_description,
          department: row?.department_name,
          actions: (
            <>
              <Button
                className="text-success"
                variant="outlined"
                onClick={() => {
                  setShowUpdateModal(true);
                  setUpdateData({
                    id: row?._id,
                    role_name: row?.role_name,
                    role_description: row?.role_description,
                    department_id: row?.department_id,
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
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/all/createRole`,
        {
          department_id: event.target[0].value,
          role_name: event.target[1].value,
          role_description: event.target[2].value,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setShow(false);
        getRoles();
        toast.success("Role added successfully!", {
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

    try {
      let response = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/api/all/updateRole/${updateData.id}`,
        {
          department_id: updateData.department_id,
          role_name: updateData.role_name,
          role_description: updateData.role_description,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setShowUpdateModal(false);
        getRoles();
        toast.success("Role updated successfully!", {
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

  useEffect(() => {
    getAllDepartments();
    getRoles();

    //eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    try {
      // let response = await axios.delete(
      //   `${process.env.REACT_APP_API_ENDPOINT}/hrDelete/${id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
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
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div class="form-group">
              <select
                class="form-select mb-2"
                id="exampleFormControlSelect1"
                required
              >
                <option disabled selected>
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
            <div class="form-group mb-2">
              <input
                type="text"
                class="form-control"
                id="role"
                aria-describedby="role"
                placeholder="Enter role"
                required
              />
            </div>
            <div class="form-group mb-2">
              <textarea
                rows={2}
                class="form-control"
                id="description"
                aria-describedby="description"
                placeholder="Enter description"
                required
              />
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
            <div class="form-group">
              <select
                class="form-select mb-2"
                id="exampleFormControlSelect1"
                required
                value={updateData.department_id}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    department_id: e.target.value,
                  })
                }
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
            <div class="form-group mb-2">
              <input
                type="text"
                class="form-control"
                id="role"
                aria-describedby="role"
                placeholder="Enter role"
                required
                value={updateData.role_name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, role_name: e.target.value })
                }
              />
            </div>
            <div class="form-group mb-2">
              <textarea
                rows={2}
                class="form-control"
                id="description"
                aria-describedby="description"
                placeholder="Enter description"
                required
                value={updateData.role_description}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    role_description: e.target.value,
                  })
                }
              />
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
              Update
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

export default Roles;

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

import { BiSolidPencil } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "./style.css";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Roles = () => {
  const [rows, setRows] = useState(null);
  const [filteredRows, setFilteredRows] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [departments, setDepartments] = useState(null);
  const [updateData, setUpdateData] = useState({
    id: "",
    role_name: "",
    role_desc: "",
    department_id: "",
  });
  const [searched, setSearched] = useState("");
  const classes = useStyles();

  const getRoles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/getAllRoles`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setRows(response.data.data);
        setFilteredRows(response.data.data);
        setIsLoading(false);
      } else {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };

  const requestSearch = (searchedVal) => {
    if (searchedVal) {
      const filteredRowsData = rows.filter((row) => {
        return row.department_name
          .toLowerCase()
          .includes(searchedVal.toLowerCase());
      });

      setFilteredRows(filteredRowsData);
    } else {
      setFilteredRows(rows);
    }
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/createRole`,
        {
          department_id: event.target[0].value,
          role_name: event.target[1].value,
          role_description: event.target[2].value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
        `${process.env.REACT_APP_API_ENDPOINT}/updateRole/${updateData.id}`,
        {
          department_id: updateData.department_id,
          role_name: updateData.role_name,
          role_description: updateData.role_desc,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
        `${process.env.REACT_APP_API_ENDPOINT}/getAllDepartments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
  }, []);

  return (
    <>
      <ToastContainer />
      <Paper className="mt-4">
        <div className="d-flex">
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            style={{ width: "80%" }}
            disabled={isLoading}
          />
          <Button
            className={"addBtn"}
            style={{ width: "20%" }}
            onClick={() => setShow(true)}
            variant="primary"
          >
            <FaPlus size={20} />
          </Button>{" "}
        </div>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows &&
                filteredRows.map((row, index) => (
                  <TableRow key={index + 1}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.role_name}</TableCell>
                    <TableCell>{row.role_description}</TableCell>
                    <TableCell>{row.department_name}</TableCell>
                    <TableCell>
                      <>
                        <Button
                          className="text-success"
                          variant="outlined"
                          onClick={() => {
                            setShowUpdateModal(true);
                            setUpdateData({
                              id: row._id,
                              role_name: row.role_name,
                              role_desc: row.role_description,
                              department_id: row.department_id,
                            });
                          }}
                        >
                          <BiSolidPencil size={22} />
                        </Button>
                        {/* <Button className="text-danger" variant="outlined">
                          <MdDelete size={22} />
                        </Button> */}
                      </>
                    </TableCell>
                  </TableRow>
                ))}

              {isLoading && !filteredRows && (
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="d-flex justify-content-center align-items-center p-5">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                      <span>&nbsp; Loading...</span>
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              )}

              {!isLoading && filteredRows?.length <= 0 && (
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <p
                      className="d-flex justify-content-center align-items-center p-4"
                      style={{ fontWeight: "600" }}
                    >
                      No data found!
                    </p>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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
                value={updateData.role_desc}
                onChange={(e) =>
                  setUpdateData({ ...updateData, role_desc: e.target.value })
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
    </>
  );
};

export default Roles;

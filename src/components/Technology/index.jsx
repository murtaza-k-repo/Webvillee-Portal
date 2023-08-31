import axios from 'axios';
import MUIDataTable from 'mui-datatables'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { BiPlus, BiSolidPencil } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Technology = () => {

  const [rows, setRows] = useState(null);
  const [show, setShow] = useState(false);
  const [departments, setDepartments] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({id: "", technology_name:"", department_id: ""});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteID] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

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
        name: "technology",
        label: "Technology",
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

  const getTechnology = async () => {
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
        console.log(response?.data?.data);

        let temp = response?.data?.data?.map((row, index) => ({
          sno: index + 1,
          technology: row?.technology_name,
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
                    technology_name: row?.technology_name,
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

    try{
        let response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/all/createTechnology`, {
            technology_name: event.target[0].vale,
            department_id: event.target[1].value
        },{
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        });

        if(response.status === 200){
            setShow(false);
            getTechnology();
            toast.success("Department added successfully!", {
                position: toast.POSITION.TOP_RIGHT
              });
        } else{
            toast.error("Something went wrong!", {
                position: toast.POSITION.TOP_RIGHT
              });
        }
    }catch(err){
        toast.error("Something went wrong!", {
            position: toast.POSITION.TOP_RIGHT
          });
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    
    try{
        let response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/all/updateTechnology/${updateData.id}`, {
            technology_name: updateData?.technology_name,
            department_id: updateData?.department_id
        },{
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        });

        if(response.status === 200){
            setShowUpdateModal(false);
            getTechnology();
            toast.success("Department updated successfully!", {
                position: toast.POSITION.TOP_RIGHT
              });
        } else{
            toast.error("Something went wrong!", {
                position: toast.POSITION.TOP_RIGHT
              });
        }
    }catch(err){
        toast.error("Something went wrong!", {
            position: toast.POSITION.TOP_RIGHT
          });
    }
  };

  useEffect(() => {
    getAllDepartments();
    getTechnology();

    //eslint-disable-next-line
  }, []);

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
          <Modal.Title>Add Technology</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div class="form-group mb-3">
              <input
                type="text"
                class="form-control"
                id="technology"
                aria-describedby="technology"
                placeholder="Enter technology"
              />
            </div>
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
            <div class="form-group mb-3">
              <input
                type="text"
                class="form-control"
                id="technology"
                aria-describedby="technology"
                placeholder="Enter technology"
                onChange={(e) => setUpdateData({...updateData, technology_name: e.target.value})}
                value={updateData.technology_name}
              />
            </div>
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
  )
}

export default Technology
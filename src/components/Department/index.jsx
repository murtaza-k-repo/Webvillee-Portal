import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { BiPlus, BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import "./style.css";
import axios from "axios";
import MUIDataTable from "mui-datatables";



const Department = () => {
  const [rows, setRows] = useState(null);
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({id: "", department_name:""});

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
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status === 200) {

        let temp = response?.data?.data?.map((row, index) => ({
          sno: index+1,
          department: row?.department_name,
          actions :(
            <>
              <Button
                className="text-success"
                variant="outlined"
                onClick={() => {
                  setShowUpdateModal(true);
                  setUpdateData({
                    id: row?._id,
                    department_name: row?.department_name
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
          )
        }))

        setRows(temp);
    
      } else {
        toast.error("Something went wrong!", {
            position: toast.POSITION.TOP_RIGHT
          });
     
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT
      });
 
    }
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
        let response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/all/createDepartment`, {
            department_name: event.target[0].value
        },{
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        });

        if(response.status === 200){
            setShow(false);
            getAllDepartments();
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
        let response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/all/updateDepartment/${updateData.id}`, {
            department_name: updateData.department_name
        },{
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        });

        if(response.status === 200){
            setShowUpdateModal(false);
            getAllDepartments();
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
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="department"
                aria-describedby="department"
                placeholder="Enter department"
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
              <input
                type="text"
                class="form-control"
                id="department"
                aria-describedby="department"
                placeholder="Enter department"
                onChange={(e) => setUpdateData({...updateData, department_name: e.target.value})}
                value={updateData.department_name}
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

export default Department;

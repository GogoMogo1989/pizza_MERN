import AdminNavbar from "../components/adminNavbar";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaBackward, FaEdit, FaCheck, FaFileDownload} from "react-icons/fa";
import AdminOrderSidebar from "../components/adminOrderSidebar";
import { useNavigate } from "react-router-dom";
import AdminPopupWindows from "./AdminPopupWindows";
import { IoMdRefresh } from "react-icons/io";
import handleDownloadInvoice from "../components/handleDownloadInvoice";
import {
  fetchOrders,
  updateOrderStatus,
  markOrderDone,
  deleteOrder
} from '../../services/orderServices';

const AdminOrderingPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [orderStatus, setOrderStatus] = useState("active");
  const [isDataRefreshed, setIsDataRefreshed] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupNavigate, setPopupNavigate] = useState("");
  const [popupConfirmCallback, setPopupConfirmCallback] = useState(()=>()=>{setPopupMessage(""), setPopupNavigate("")}); 
  const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchOrders();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    loadData();
  }, [isDataRefreshed]);

  const filteredData = data.filter((item) => {
    const matchesStatus =
      (orderStatus === "active" && item.is_active) ||
      (orderStatus === "completed" && !item.is_active);

    return matchesStatus;
  })

  const confirmActiveChange = (id) => {
    let isActive = orderStatus === 'completed' ? true : false;
    setPopupMessage(
      isActive ? 'Biztos, hogy újra aktiválod a rendelést?' : 'Biztos lezárod a rendelést?'
    );
    setPopupWindowCancelButtonPreview(true)
    setPopupConfirmCallback(() => () => handleActive(id, isActive));
  };

  const handleActive = async (id, isActive) => {
    try {
      await updateOrderStatus(id, isActive);
      setIsDataRefreshed((prev) => !prev);
      if (!isActive) {
        await markOrderDone(id);
      }
    } catch (error) {
      setPopupMessage(error.message);
    } finally {
      setPopupMessage('');
      setPopupConfirmCallback(() => () => setPopupMessage(''));
    }
  };

  const confirmDeleteChange = (id) => {
    setPopupMessage('Biztos, hogy törlöd a rendelést?')
    setPopupConfirmCallback(() => () => handleDelete(id));
    setPopupWindowCancelButtonPreview(true)
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      setIsDataRefreshed((prev) => !prev);
    } catch (error) {
      setError(error.message);
    } finally {
      setPopupMessage('');
      setPopupConfirmCallback(() => () => setPopupMessage(''));
    }
  };

  const handleStatusChange = (status) => {
    setOrderStatus(status);
  };

  const handleEdit = (id) => {
    navigate("/adminorderingedit", { state: { id } });
  };

  const pageRefreshed = () => {
    setIsDataRefreshed((prev) => !prev);
  }

  const columns = [
    { field: "order_number", headerName: "Azonosító", flex: 1 },
    {
      field: "order_date",
      headerName: "Dátum",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        date.setHours(date.getHours());
        
        const formattedDate = date.toLocaleString("hu-HU", {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
    
        return (
          <div className="overflow-x-auto max-w-xs">
            <table className="min-w-full">
              <tbody>
                <tr>
                  <td className="p-2">{formattedDate}</td> 
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    },
    { field: "name", headerName: "Név", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone_number", headerName: "Telefonszám", flex: 1 },
    { field: "zip_code", headerName: "Irányítószám", flex: 0.5 },
    { field: "city", headerName: "Város", flex: 1 },
    { field: "address", headerName: "Cím", flex: 1 },
    { field: "type_of_delivery", headerName: "Szállítási mód", flex: 1 },
    { field: "type_of_paid", headerName: "Fizetési mód", flex: 0.8 },
    {
      field: "ordered_data",
      headerName: "Termékek",
      flex: 2,
      renderCell: (params) => (
        <div className="overflow-x-auto max-w-xs">
          <table className="min-w-full border-collapse">
            <tbody>
              {params.value.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.product_name}</td>
                  <td className="border p-2">{item.quantity}db</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    { field: "price", headerName: "Ár(Ft)", type: "number", flex: 0.8 },
    {
      field: "Action",
      headerName: "",
      flex: 1.2,
      renderCell: (params) => (
        <div className="flex justify-center items-center gap-2 h-full">
          <button className="py-1 px-2" onClick={() => confirmDeleteChange(params.id)}>
            <FaTrashAlt size={20} />
          </button>
          {orderStatus === "active" ? (
            <div className="flex">
              <button className="py-1 px-2" onClick={() => confirmActiveChange(params.id)}>
                <FaCheck size={20} />
              </button>
              <button className="py-1 px-2" onClick={() => handleEdit(params.id)}>
                <FaEdit size={20} />
              </button>
            </div>
          ) : (
            <button className="py-1 px-2" onClick={() => confirmActiveChange(params.id)}>
              <FaBackward size={20} />
            </button>
          )}
        </div>
      ),
    },
    {
      field: "Download_Invoice",
      headerName: "Számla letöltése",
      flex: 1.5,
      renderCell: (params) => (
        <div className="flex justify-center items-center gap-2 h-full">
          <button onClick={() => handleDownloadInvoice(params.id, data)}>
            <FaFileDownload size={20} />
          </button>
        </div>
      ),
    },
  ];  
  
  const rows = filteredData.map((item) => ({
    id: item._id,
    name: item.name,
    price: item.price,
    email: item.email,
    phone_number: item.phone_number,
    country: item.country,
    zip_code: item.zip_code,
    city: item.city,
    address: item.address,
    ordered_data: item.ordered_data,
    order_number: item.order_number,
    type_of_paid: item.type_of_paid,
    type_of_delivery: item.type_of_delivery,
    order_date: item.order_date
  }));

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <AdminOrderSidebar onStatusChange={handleStatusChange} />
        <div className="ml-80 pl-20 pt-20">
          {error && <p className="text-red-500">{error}</p>}
          <div className='flex justify-start w-1100'>
              <button 
                  onClick={()=>(pageRefreshed())}
                  className="mb-4 py-2 px-4 flex items-center gap-2"
              >
                  <IoMdRefresh size={30} className="text-blue-500"/>
              </button>
          </div>
          <div className="h-screen overflow-auto w-screen">
            <DataGrid
              rows={rows}
              columns={columns}
              getRowHeight={() => "auto"}
              sx={{
                [`& .${gridClasses.cell}`]: {
                  py: 1,
                },
              }}
            />
          </div>
        </div>
      </div>
      {popupMessage && (
        <AdminPopupWindows
          message={popupMessage}
          popupNavigate={popupNavigate}
          onConfirm={popupConfirmCallback} 
          onCancel={() => {
            setPopupMessage('');
            setPopupNavigate('');
            setPopupConfirmCallback(()=>()=>{setPopupMessage(""); setPopupNavigate("");})
          }}
          popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
        />
      )}
    </div>
  );
};

export default AdminOrderingPage;
import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/adminNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminPopupWindows from './AdminPopupWindows';
import {
    fetchProductById,
    saveProductData,
  } from "../../services/productServices";
import {
    fetchCategories
} from "../../services/categoriesService";

const AdminUpload = () => {

const [categories, setCategories] =useState([])
const [selectedCategory, setSelectedCategory] = useState('');
const [file, setFile] = useState(null);
const [filePreview, setFilePreview] = useState(''); 
const [name, setName] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [itemId, setItemId] = useState(null);
const [popupMessage, setPopupMessage] = useState('');
const [popupNavigate, setPopupNavigate] = useState('');
const [popupConfirmCallback, setPopupConfirmCallback] = useState(() => () => {setPopupMessage(""), setPopupNavigate("")});
const [popupWindowCancelButtonPreview, setPopupWindowCancelButtonPreview] = useState(false);
const [error, setError] = useState('')
const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchCategories();
        setCategories(result[0].categories);
      } catch (error) {
        setError(error.message);
      }
    };

    loadData();
  }, []);

useEffect(() => {
    if (location.state && location.state.id) {
        const loadProductData = async () => {
        try {
            const item = await fetchProductById(location.state.id);
            setItemId(item._id);
            setSelectedCategory(item.categories);
            setName(item.name);
            setPrice(item.price);
            setDescription(item.description);
            setFilePreview(item.file);
        } catch (error) {
            setPopupMessage(`Hiba történt a termék adatainak betöltése során: ${error.message}`);
        }
        };

        loadProductData();
    }
    }, [location.state]);

// Aktuális kép beállítása
const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();

    reader.onloadend = () => {
        setFilePreview(reader.result);
    };

    reader.readAsDataURL(selectedFile);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !name || !price || !description) {
        setPopupMessage('Minden mezőt ki kell tölteni!');
        return;
    }

    if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
            const base64File = reader.result.split(',')[1];
            await saveProductDataHandler(base64File);
            };
            reader.readAsDataURL(file);
        } else {
            await saveProductDataHandler();
        }
};

const saveProductDataHandler = async (base64File) => {
    const productData = {
        file: base64File ? `data:${file.type};base64,${base64File}` : filePreview,
        name,
        price,
        description,
        category: selectedCategory,
    };

    try {
        const response = await saveProductData(itemId, productData);
        setPopupMessage(response.message);
        setPopupNavigate('/adminmain');
    } catch (error) {
        setPopupMessage(`Hiba történt az adat mentése során: ${error.message}`);
    }
};

const handleBack = () => {
    navigate('/adminmain');
};

    return (
        <div className="flex justify-center">
            <div className="mt-20 p-4 max-w-2xl w-full">
                <AdminNavbar />
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maincategory">
                        Kategória
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="maincategory"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="" disabled>Válassz egy kategóriát</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Név
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Termék neve"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Ár (Ft)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="text"
                        placeholder="Termék ára"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Leírás
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Termék leírása"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                            Fájl feltöltés (csak új fájl esetén)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    {filePreview && (
                        <div className="ml-4">
                            <img src={filePreview} alt="Fájl előnézete" className="w-24 h-auto" />
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleBack}
                    >
                        Vissza
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Mentés
                    </button>
                </div>
            </form>
        </div>
        {popupMessage && (
                <AdminPopupWindows
                message={popupMessage} 
                popupNavigate={popupNavigate}
                onConfirm={popupConfirmCallback} 
                onCancel={() => {
                setPopupMessage('');
                setPopupNavigate('');
                setPopupConfirmCallback(()=>()=>{setPopupMessage(""), setPopupNavigate("")});
                }}
                popupWindowCancelButtonPreview={popupWindowCancelButtonPreview}
                />
            )}
        </div>
    );
}

export default AdminUpload;
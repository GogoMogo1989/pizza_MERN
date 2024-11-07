import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../services/categoriesService'

function AdminMainSidebar({onCategorySelect}) {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState();

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

    return (
        <div className="w-80 bg-gray-800 text-white h-[calc(100vh-4rem)] p-4 fixed top-16 left-0 overflow-y-auto">
            {categories.map((category) => (
                <div className="mb-2" key={category}>
                    <button
                        onClick={() => {
                            onCategorySelect(category === "Összes termék" ? null : category);
                        }}
                        className={`w-full text-left py-2 px-4 bg-gray-800 hover:bg-gray-600 transition duration-300 rounded`}
                    >
                        {category}
                    </button>
                </div>
            ))}
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default AdminMainSidebar;

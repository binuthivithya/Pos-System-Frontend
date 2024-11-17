import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";

function Category() {


    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");

    async function loadCategories() {
        const response = await axios.get("http://localhost:8081/category");
        setCategories(response.data);
    }

    function handleCategoryName(event: any) {
        setCategoryName(event.target.value);
    }

    async function handleSubmit() {
        const data = {
            name: categoryName
        }
        const response = await axios.post("http://localhost:8081/category", data);
        console.log(response.data);
        loadCategories();
    }
    // side effect
    useEffect(function () {
        
        loadCategories(); // function that will be triggered at the side effect
        
    },[]); // dependency array, empty array means this effect will run only once

    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5 text-slate-900">Categories</h1>

            {/* conditional rendering */}
            {categories && categories.map(function(category: CategoryType) {
                return (
                    <div className="text-slate-600 border border-slate-200 rounded-lg mb-3 p-3 shadow-lg inline-block me-3">
                        {category.name}
                    </div>
                )
            })
            }

            <h2 className="text-xl text-slate-900 font-medium mb-3 mt-5">Create Category</h2>

            <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-[350px]">
                <form>
                    <label className="text-slate-600 font-sm block mb-2">Category Name</label>
                    <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" onChange={handleCategoryName} required/>

                    <button type="button" className="py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-700 mb-2 font-sm" onClick={handleSubmit}>Create Category</button>
                </form>
            </div>
            
        </div>
    )
}

export default Category;
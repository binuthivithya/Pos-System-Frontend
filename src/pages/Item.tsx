import axios from "axios";
import { useEffect, useState } from "react";

function Item() {

    const [products, setProducts] = useState<ProductType[]>([]);
    const [productName, setProductName] = useState<string>("");
    const [price, setPrice] = useState<number>(0.0);
    const [description, setDescription] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>();

    const [categories, setCategories] = useState<CategoryType[]>([])

    async function loadProducts() {
        const response = await axios.get("http://localhost:8081/products", config);
        setProducts(response.data);
    }

    async function loadCategories() {
        const response = await axios.get("http://localhost:8081/categories", config);
        setCategories(response.data);
    }

    useEffect(function () {
        loadProducts();
        loadCategories();
        
    },[])

    function handleProductName(event: any){
    setProductName(event.target.value);
    }

    function handlePrice(event: any){
        setPrice(event.target.value);
    }

    function handleDescription(event: any){
        setDescription(event.target.value);
    }
    function handleCategoryId(event: any){
        setCategoryId(event.target.value);
    }

    async function handleSubmit() {
        const data = {
            name: productName,
            price: price,
            description: description,
            categoryId: categoryId
        }

        try {
            await axios.post("http://localhost:8081/products", data);
            loadProducts();
            setProductName("");
            setPrice(0.0);
            setDescription("");
            setCategoryId(0);
        } catch (error: any) {
            console.log(error);
        }
    }

    const [productEditing, setProductEditing] = useState<ProductType | null>(null);

    function editProduct(product: ProductType) {
        setProductEditing(product);
        setProductName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategoryId(product.category?.id);
    }

    async function updateProduct() {
        const data = {
            name: productName,
            price: price,
            description: description,
            categoryId: categoryId
        }

        try {
            await axios.put(`http://localhost:8081/products/${productEditing?.id}`, data);  /*"http://localhost:8081/products/" + productEditing?.id*/
            setProductEditing(null);

            loadProducts();

            setProductName("");
            setPrice(0.0);
            setDescription("");
            setCategoryId(0);
        } catch (error: any) {
            console.log(error);
        }
    }

    async function deleteProduct(productId: number) {
        try {
            await axios.delete(`http://localhost:8081/products/ + ${productId}`);
            loadProducts();
        } catch (error: any) {
            console.log(error);
        }
    }


    return (
        <div className="container mx-auto py-5">
            <h1 className="text-3xl font-semibold text-slate-900 mb-5">Product</h1>

            <table className="w-full border-separate border-spacing-0 border-0 text-left mb-10">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[100px]">Product ID</th>
                        <th className="w-[200px]">Product Name</th>
                        <th className="w-[200px]">Product Price</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {products.map(function (product : ProductType) {
                    return (
                        <tr>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => editProduct(product)} className="bg-slate-300 text-slate-600 px-2
                                 py-1 rounded-lg hover:bg-slate-400 transition duration-200 ease-in w-20">Edit</button>

                                <button onClick={() => deleteProduct(product.id)} className="bg-red-400 text-white rounded-lg px-2 py-1 w-20 ml-2
                                hover:bg-red-600 transition duration-200 ease-in">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>

            <div className="border border-slate-200 mt-5 py-3 px-4 rounded-lg max-w-[350px]">
                <form>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Product Name</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border
                        border-slate-300 rounded-lg" placeholder="Name" value={productName} onChange={handleProductName} required></input>
                    </div>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Product Price</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border
                        border-slate-300 rounded-lg" placeholder="Price" value={price} onChange={handlePrice} required></input>
                    </div>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Product Description</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border
                        border-slate-300 rounded-lg" placeholder="Description" value={description} onChange={handleDescription}></input>
                    </div>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Category ID</label>
                        <select className="text-slate-600 font-sm block mb-3 w-full p-2 border
                        border-slate-300 rounded-lg" value={categoryId} onChange={handleCategoryId} required>
                            <option value="">Please select a Category</option>
                            {categories.map(function (category) {
                                return (
                                    <option value={category.id}>{category.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {productEditing ? (
                        <button type="button"
                                className="py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-700 mb-2 font-sm"
                                onClick={updateProduct}>Update Product
                        </button>
                    ) : (
                        <button type="button"
                                className="py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-700 mb-2 font-sm"
                                onClick={handleSubmit}>Create Product
                        </button>
                    )}

                </form>
            </div>

        </div>
    )
}

export default Item;
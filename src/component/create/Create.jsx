import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImage] = useState("");
  const [price, setPrice] = useState();
  const [review, setReview] = useState();
  const navigate = useNavigate();
  //รับ auth มาจาก state
  const { token } = useSelector((state) => state.auth);

  //type ="file"
  // const onChangeFile = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      //UPLOAD PRODUCT
      const res = await axios.post(
        "https://backend-web-ordering.onrender.com/api/products/add",
        {
          title,
          description,
          price,
          img,
          review,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      navigate(`/food/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 w-full items-center justify-center flex flex-col">
      <h1 className="text-2xl">CREATE PRODUCT</h1>
      <form onSubmit={handleCreateProduct} className="w-1/2">
        <label className="input-group input-group-vertical text-black my-4">
          <span>title</span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="title"
            className="input input-bordered"
          />
        </label>

        <label className="input-group input-group-vertical text-black my-4">
          <span>description</span>
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="description"
            className="input input-bordered"
          />
        </label>

        <label className="input-group input-group-vertical text-black my-4">
          <span>price</span>
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="price"
            className="input input-bordered"
          />
        </label>

        <label className="input-group input-group-vertical text-black my-4">
          <span>review</span>
          <input
            onChange={(e) => setReview(e.target.value)}
            type="number"
            placeholder="review"
            className="input input-bordered"
          />
        </label>

        <label className="input-group input-group-vertical my-4 text-black ">
          <span>category</span>
          <select id="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">Please Select Somthing</option>
            <option value="thaifood">Thai Foods</option>
            <option value="americanfood">American Foods</option>
            <option value="other">others</option>
          </select>
        </label>
        <label className="input-group input-group-vertical my-4 text-black ">
          <span>IMG file</span>
          <input
            onChange={(e) => setImage(e.target.value)}
            type="text"
            className="file-input file-input-bordered w-full "
          />
        </label>

        <button type="submit" className="btn btn-success">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Create;

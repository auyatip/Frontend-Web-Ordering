import { Link } from "react-router-dom";
import { data } from "../../data/data";

const Foods = () => {
  return (
    <section
      id="foods"
      className="flex flex-col mt-10 items-center justify-center"
    >
      <div className="mb-5 text-4xl bg-gray-600  py-4 px-20 rounded-full ">
        CATEGORY
      </div>
      <div className="grid justify-center items-center lg:grid lg:gap-10 lg:grid-cols-2 xl:grid xl:grid-cols-3">
        {/* ///////// */}
        {data.map((foodtop) => (
          <Link to={`/foods/${foodtop.category}`} key={foodtop.id} className="">
            <div className="card w-96 glass h-[50vh] mb-5">
              <figure>
                <img
                  src={foodtop.image}
                  alt={foodtop.name}
                  className="h-[30vh] w-[40vh]"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title uppercase text-blue-300">
                  {foodtop.name}
                </h2>
                <p>{foodtop.title}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">{foodtop.price}</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Foods;

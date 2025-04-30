import { useEffect, useState } from "react";
// import ProductCategory from "../ProductCategory";
import ProductContainer from "../ProductContainer";
import ProductItem from "../ProductItem";
import { Link } from "react-router-dom";
import { ApiBaseUrl } from "../../../global/global-variables";

function ProductSection(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = ApiBaseUrl; // Đổi sang đúng endpoint của bạn

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        // Nếu backend trả ra object { data: [...] }
        const data = json.data || json; // fallback nếu là mảng
        setProducts(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  function HandleButtonRender(props) {
    if (props.button) {
      return (
        <div className="mb-24 flex w-full justify-center">
          <Link
            to={"/product"}
            className="rounded-3xl border-2 border-blue-500 bg-blue-500 px-8 py-2 text-sm font-medium text-white shadow-md duration-300 ease-in-out hover:border-blue-500 hover:bg-white hover:text-blue-500"
          >
            Browse All Items
          </Link>
        </div>
      );
    }
  }

  // function HandleCategoryRender(props) {
  //   if (props.category) {
  //     return <ProductCategory />;
  //   }
  // }

  return (
    <>
      <div className="mt-12 mb-12">
        <div className="text-center text-2xl font-bold">{props.title}</div>
        <div className="my-8 text-center font-medium text-zinc-400 lg:px-36">
          Let's explore the dishes and their nutritional information!
        </div>
        <div className="mb-6 text-center text-sm text-gray-400 lg:px-36">
          💪 Protein | 🍚 Carbs | 🧈 Fat | 🍭 Sugar
        </div>
        {/* {HandleCategoryRender(props)} */}
        <ProductContainer>
          {products.map((product, key) => (
            <ProductItem
              key={key}
              name={product.name}
              price={`${product.calories} cal`}
              rating={`💪 ${product.protein}g | 🍚 ${product.carbs}g | 🧈 ${product.fat}g | 🍭 ${product.sugar}g`}
              image={product.imageUrl}
            />
          ))}
        </ProductContainer>
      </div>
      {HandleButtonRender(props)}
    </>
  );
}

export default ProductSection;

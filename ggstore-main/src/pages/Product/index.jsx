import Navbar from "../../components/Navbar";
import DefaultWrapper from "../../components/Wrappers/Default";
import ProductSection from "../../components/Product/ProductSection";
import Footer from "../../components/Footer";

function Product() {
  return (
    <>
      <Navbar />
      <DefaultWrapper>
        <ProductSection
          // products={products}
          title={"Browse Nutritional Information"}
          button={false}
          category={true}
        />
      </DefaultWrapper>
      <Footer />
    </>
  );
}

export default Product;

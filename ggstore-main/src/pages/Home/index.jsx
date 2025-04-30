import Navbar from "../../components/Navbar";
import DefaultWrapper from "../../components/Wrappers/Default";
import images from "../../assets/img";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

import CustomerSection from "../../components/Customer/CustomerSection";
// import products from "../../assets/products";

function Home() {
  return (
    <div className="">
      <Navbar />
      <DefaultWrapper>
        {/* Banner */}
        <div
          className="grid grid-cols-12 lg:gap-12"
          style={{
            backgroundImage: `url(${images.dottedBg})`,
            backgroundSize: "contain",
          }}
        >
          <div className="col-span-12 mt-20 md:col-span-8">
            <img src={images.banner} alt="" className="object-cover" />
          </div>
          <div className="col-span-12 flex h-full flex-col justify-center md:col-span-4">
            <p className="w-content mb-3 rounded-xl bg-white text-4xl font-bold">
              HEALTH
            </p>
            <p className="mb-4 rounded-xl bg-white text-4xl font-bold">
              IS THE GREATEST WEALTH
            </p>
            <h3 className="mb-4 rounded-xl bg-white text-lg font-medium text-zinc-500">
              Take care of your body. It’s the only place you have to live.
            </h3>
            <Link
              to={"/product"}
              className="flex w-full justify-center rounded-3xl border-2 border-blue-500 bg-blue-500 py-2 px-4 font-bold text-white shadow-md duration-300 ease-in-out hover:bg-[#fafafa] hover:text-blue-500 md:w-auto md:self-start"
            >
              BROWSE NUTRITIONAL FACTS
            </Link>
          </div>
        </div>

        <CustomerSection />
      </DefaultWrapper>
      <Footer />
    </div>
  );
}

export default Home;

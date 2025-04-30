import images from "../../assets/img";
import BackButtonBar from "../../components/BackButton/BackButtonBar";
import DefaultWrapper from "../../components/Wrappers/Default";

function Contact() {
  return (
    <DefaultWrapper>
      <BackButtonBar />
      <div className="flex h-[calc(100vh-80px)] flex-col justify-evenly md:px-28">
        {/* Title */}
        <div className="self-center text-2xl font-bold">
          We love hearing from our friends
        </div>
        {/* Contact Form */}
        <div className="flex flex-col items-center md:flex-row">
          <form className="flex h-full w-full flex-col">
            <div className="">
              <label
                htmlFor="email"
                className="text-xs font-bold text-zinc-500"
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                className="mb-4 w-full border-b border-zinc-300 bg-white  px-2 pt-3 pb-5 focus:border-zinc-600 focus:outline-none"
                placeholder="name@example.com"
              />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="text-xs font-bold text-zinc-500"
              >
                FEEDBACK
              </label>
              <textarea
                id="feedback"
                rows="4"
                className="line-clamp-3 mb-4 w-full border-b border-zinc-300 bg-white  px-2 pt-3 pb-5 focus:border-zinc-600 focus:outline-none"
                placeholder="Write your feedback..."
              />
            </div>
            <button className="w-full bg-black py-4 text-sm font-semibold text-white duration-300 ease-in-out hover:opacity-80">
              SEND
            </button>
          </form>
          <div className="ml-24 hidden md:block">
            <img
              src={images.mailbox}
              alt=""
              className="w-[560px] object-contain"
            />
          </div>
        </div>
        {/* Description */}
        <div className="self-center text-sm text-zinc-400">
          Hope the app help you well!
        </div>
      </div>
    </DefaultWrapper>
  );
}

export default Contact;

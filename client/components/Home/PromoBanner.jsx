import Link from "next/link";

const PromoBanner = () => {
  return (
    <div className="mt-[50px] mb-[-120px]">
      <div className="bg-teal-100 lg:px-24 px-6 pt-[10px] flex flex-col items-center md:flex-row justify-between">
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="font-bold text-3xl">
            2023 National Book Awards For Fiction Shorlist
          </h1>
          <Link
            href={"/shop"}
            className="w-max border-none outline-none bg-blue-700 text-white font-bold px-4 py-2 rounded"
          >
            Get Promo Code
          </Link>
        </div>
        <div className="md-w-1/2">
          <img
            className="w-80 object-cover"
            src="/assets/awardbooks.png"
            alt=""
          />
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#d5f5f6"
          fill-opacity="0.85"
          d="M0,288L120,250.7C240,213,480,139,720,96C960,53,1200,43,1320,37.3L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

export default PromoBanner;

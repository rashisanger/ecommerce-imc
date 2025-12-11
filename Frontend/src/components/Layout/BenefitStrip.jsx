import { FaLeaf, FaShippingFast, FaShieldAlt, FaSmile } from "react-icons/fa";

const BenefitsStrip = () => {
  const benefits = [
    {
      icon: <FaLeaf size={28} />,
      title: "100% Herbal Products",
      desc: "Made from natural and authentic ingredients",
    },
    {
      icon: <FaShippingFast size={28} />,
      title: "Fast Delivery",
      desc: "Get your products delivered quickly",
    },
    {
      icon: <FaShieldAlt size={28} />,
      title: "Secure Payments",
      desc: "100% safe and encrypted checkout",
    },
    {
      icon: <FaSmile size={28} />,
      title: "Trusted by Thousands",
      desc: "Loved by wellness customers",
    },
  ];

  return (
    <div className="w-full bg-[#f8fef8] py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition"
          >
            <div className="text-green-700 mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsStrip;

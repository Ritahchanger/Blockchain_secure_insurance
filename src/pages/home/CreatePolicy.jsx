import React, { useState } from "react";
import "./Home.css";

const CreatePolicy = ({ contract, accounts }) => {
  const [user, setUser] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [hospital, setHospital] = useState("");
  const [policyAmount, setPolicyAmount] = useState(0);
  const [premium, setPremium] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreatePolicy = async (event) => {
    event.preventDefault();
    try {
      await contract.methods
        .createIns(
          user,
          insuranceCompany,
          hospital,
          policyAmount,
          premium,
          startDate,
          endDate
        )
        .send({ from: accounts[0] });
      alert("Policy created successfully!");
    } catch (error) {
      alert(`Failed to create policy: ${error.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded-md shadow-xl mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Create Policy
      </h2>
      <form onSubmit={handleCreatePolicy} className="space-y-6">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex gap-[1rem]">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Insurance Company"
              value={insuranceCompany}
              onChange={(e) => setInsuranceCompany(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Hospital"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex gap-[1rem]">
          <div className="space-y-2">
            <label className="block text-gray-700">Policy Amount</label>
            <input
              type="number"
              value={policyAmount}
              onChange={(e) => setPolicyAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Premium</label>
            <input
              type="number"
              placeholder="Premium"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1rem]">
          <div className="space-y-1">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Create Policy
        </button>
      </form>
    </div>
  );
};

export default CreatePolicy;

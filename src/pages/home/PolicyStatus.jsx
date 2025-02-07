import React, { useState } from "react";

const PolicyStatus = ({ contract }) => {
  const [userAddress, setUserAddress] = useState("");
  const [policyDetails, setPolicyDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckPolicy = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const details = await contract.methods
        .getPolicyDetails(userAddress)
        .call();
      setPolicyDetails({
        user: details[0],
        insuranceCompany: details[1],
        hospital: details[2],
        policyAmount: details[3],
        premium: details[4],
        startDate: new Date(parseInt(details[5]) * 1000).toLocaleDateString(),
        endDate: new Date(parseInt(details[6]) * 1000).toLocaleDateString(),
      });
    } catch (error) {
      alert(`Failed to fetch policy details: ${error.message}`);
      setPolicyDetails(null);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Check Policy Status
      </h2>
      <form onSubmit={handleCheckPolicy} className="space-y-4">
        <input
          type="text"
          placeholder="Enter User Address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-lg ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } transition duration-300`}
        >
          {loading ? "Checking..." : "Check Policy"}
        </button>
      </form>

      {policyDetails && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Policy Details
          </h3>
          <p>
            <strong>User:</strong> {policyDetails.user}
          </p>
          <p>
            <strong>Insurance Company:</strong> {policyDetails.insuranceCompany}
          </p>
          <p>
            <strong>Hospital:</strong> {policyDetails.hospital}
          </p>
          <p>
            <strong>Policy Amount:</strong> {policyDetails.policyAmount} ETH
          </p>
          <p>
            <strong>Premium:</strong> {policyDetails.premium} ETH
          </p>
          <p>
            <strong>Start Date:</strong> {policyDetails.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {policyDetails.endDate}
          </p>
        </div>
      )}
    </div>
  );
};

export default PolicyStatus;

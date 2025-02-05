import React from "react";

const VerifyClaim = ({ contract, accounts }) => {
  const handleVerifyClaim = async (accepted) => {
    try {
      await contract.methods[accepted ? "acceptClaim" : "rejectClaim"]().send({
        from: accounts[1],
      });
      alert(`Claim ${accepted ? "accepted" : "rejected"} successfully!`);
    } catch (error) {
      alert(`Failed to verify claim: ${error.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-sm shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Verify Claim
      </h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleVerifyClaim(true)}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
        >
          Accept Claim
        </button>
        <button
          onClick={() => handleVerifyClaim(false)}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        >
          Reject Claim
        </button>
      </div>
    </div>
  );
};

export default VerifyClaim;

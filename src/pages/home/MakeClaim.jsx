import React, { useState } from "react";

const MakeClaim = ({ contract, accounts }) => {
  const [claimAmt, setClaimAmt] = useState(0);

  const handleClaim = async (event) => {
    event.preventDefault();
    try {
      await contract.methods.makeClaim(claimAmt).send({ from: accounts[0] });
      alert("Claim submitted successfully!");
    } catch (error) {
      alert(`Failed to make claim: ${error.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Make Claim
      </h2>
      <form onSubmit={handleClaim} className="space-y-6">
        <div>
          <input
            type="number"
            placeholder="Claim Amount"
            value={claimAmt}
            onChange={(e) => setClaimAmt(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Make Claim
        </button>
      </form>
    </div>
  );
};

export default MakeClaim;

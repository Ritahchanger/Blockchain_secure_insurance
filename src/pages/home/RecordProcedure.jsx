import React, { useState } from "react";

const RecordProcedure = ({ contract, accounts }) => {
  const [procedureName, setProcedureName] = useState("");
  const [procedureTimestamp, setProcedureTimestamp] = useState("");

  const handleRecordProcedure = async (event) => {
    event.preventDefault();
    try {
      await contract.methods
        .recordProcedure(procedureName, procedureTimestamp)
        .send({ from: accounts[0] });
      alert("Procedure recorded successfully!");
    } catch (error) {
      alert(`Failed to record procedure: ${error.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Record Procedure
      </h2>
      <form onSubmit={handleRecordProcedure} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Procedure Name"
            value={procedureName}
            onChange={(e) => setProcedureName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <input
            type="datetime-local"
            value={procedureTimestamp}
            onChange={(e) => setProcedureTimestamp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Record Procedure
        </button>
      </form>
    </div>
  );
};

export default RecordProcedure;

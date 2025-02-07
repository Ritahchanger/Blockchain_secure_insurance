import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Insurance from "../../contracts/Insurance.json";
import CreatePolicy from "./CreatePolicy";
import RecordProcedure from "./RecordProcedure";
import MakeClaim from "./MakeClaim";
import VerifyClaim from "./VerifyClaim";
import PolicyStatus from "./PolicyStatus";

import Preloader from "./Preloader";

const Home = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [activeTab, setActiveTab] = useState("createPolicy");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{


    const isAuthenticated = 

  })

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:7545"
        );
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);
      } catch (error) {
        console.error("Error initializing web3:", error);
      }
    };
    initWeb3();
  }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (web3) {
        const fetchedAccounts = await web3.eth.getAccounts();
        setAccounts(fetchedAccounts);
      }
    };
    fetchAccounts();
  }, [web3]);

  useEffect(() => {
    const fetchContract = async () => {
      if (web3) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Insurance.networks[networkId];
        if (deployedNetwork) {
          const contractInstance = new web3.eth.Contract(
            Insurance.abi,
            deployedNetwork.address
          );
          setContract(contractInstance);
        }
      }
    };
    fetchContract();
  }, [web3]);

  const handleTabChange = (tab) => {
    setIsLoading(true); // Start preloader
    setTimeout(() => {
      setActiveTab(tab); // Switch tab after 2 seconds
      setIsLoading(false); // Stop preloader
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 px-4">
      <div className="max-w-full mx-auto text-center">
        <h1 className="text-4xl font-bold p-2 mb-2 border-b border-neutral-300">
          Insurance App
        </h1>
        <p className="text-lg mb-[1rem]">User account: {accounts[0]}</p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-[2rem]">
          {/* <div className="flex justify-center space-x-6 mb-[2rem]"> */}
          <button
            className={`${
              activeTab === "createPolicy"
                ? "bg-orange-700 text-white"
                : "bg-orange-500 text-white"
            } py-2 px-4 rounded-sm hover:bg-orange-300 transition duration-300`}
            onClick={() => handleTabChange("createPolicy")}
          >
            Create Policy
          </button>
          <button
            className={`${
              activeTab === "recordProcedure"
                ? "bg-orange-700 text-white"
                : "bg-orange-500 text-white"
            } py-2 px-4 rounded-sm hover:bg-orange-300 transition duration-300`}
            onClick={() => handleTabChange("recordProcedure")}
          >
            Record Procedure
          </button>
          <button
            className={`${
              activeTab === "makeClaim"
                ? "bg-orange-700 text-white"
                : "bg-orange-500 text-white"
            } py-2 px-4 rounded-sm hover:bg-orange-300 transition duration-300`}
            onClick={() => handleTabChange("makeClaim")}
          >
            Make Claim
          </button>
          <button
            className={`${
              activeTab === "verifyClaim"
                ? "bg-orange-700 text-white"
                : "bg-orange-500 text-white"
            } py-2 px-4 rounded-sm hover:bg-orange-300 transition duration-300`}
            onClick={() => handleTabChange("verifyClaim")}
          >
            Verify Claim
          </button>
          <button
            className={`${
              activeTab === "policyStatus"
                ? "bg-orange-700 text-white"
                : "bg-orange-500 text-white"
            } py-2 px-4 rounded-sm hover:bg-orange-300 transition duration-300`}
            onClick={() => handleTabChange("policyStatus")}
          >
            Policy Status
          </button>
        </div>

        {/* Preloader */}
        {isLoading && <Preloader />}

        {/* Rendering Components Based on Active Tab */}
        <div className="mt-8">
          {activeTab === "createPolicy" && (
            <CreatePolicy contract={contract} accounts={accounts} />
          )}
          {activeTab === "recordProcedure" && (
            <RecordProcedure contract={contract} accounts={accounts} />
          )}
          {activeTab === "makeClaim" && (
            <MakeClaim contract={contract} accounts={accounts} />
          )}
          {activeTab === "verifyClaim" && (
            <VerifyClaim contract={contract} accounts={accounts} />
          )}
          {activeTab === "policyStatus" && <PolicyStatus contract={contract} />}
        </div>
      </div>
    </div>
  );
};

export default Home;

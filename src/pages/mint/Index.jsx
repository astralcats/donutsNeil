import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { injected, walletConnect } from "../../connectors";
import connect from "./connect.svg"
import meta from "./meta.svg"
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
const contractAddress = '0xBfC829f5C3E1CC8A24E5261a37E591db4aD8cca5';
const contractABI = [{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"numDeezDonuts","type":"uint256"}],"name":"mintDeezDonuts","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintDozenDeezDonuts","outputs":[],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"pauseSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"numDeezDonuts","type":"uint256"}],"name":"reserveGiveaway","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dozenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hasSaleStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_DeezDonuts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const mintPrice1 = '25000000000000000';
const mintPrice12 = '280000000000000000';

const Mint = () => {
  const [addAnimation, setAddAnimation] = useState(false);
  const [open, setOpen] = useState(false);
  const debouncedVal = useDebounce(addAnimation, 300);
  const { activate, active, account, library } = useWeb3React();

  async function metamask() {
    try {
      await activate(injected);
      setOpen(false);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function walletConnect1() {
    try {
      await activate(walletConnect);
      setOpen(false);
    } catch (ex) {
      console.log(ex);
    }
  }

  function notReleased() {
    alert("Collection not released yet, check back later!");
  }

  async function mint() {
    const web3 = new Web3(library)
    const contract = new web3.eth.Contract(contractABI, contractAddress)

    await contract.methods.mintDeezDonuts(1).send({
      from: account,
      value: mintPrice1
    }).then((res) => {
      window.alert("Minted 1 Donut!")
    }).catch((err) => {
      window.alert("Mint Failed")
    })
  };

  async function mintDozen() {
    const web3 = new Web3(library)
    const contract = new web3.eth.Contract(contractABI, contractAddress)

    await contract.methods.mintDozenDeezDonuts().send({
      from: account,
      value: mintPrice12
    }).then((res) => {
      window.alert("Minted 12 Donuts!")
    }).catch((err) => {
      window.alert("Mint Failed")
    })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAddAnimation(false);
    }, 820);

    return () => {
      clearTimeout(timeout);
    };
  }, [addAnimation, debouncedVal]);

  return (
    <div className="flex justify-start items-center flex-col w-full">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`overlay ${open ? "display-flex" : ""}`}
      ></div>
      <div className={`pop-up ${open ? "display-flex" : ""}`}>
        <div onClick={metamask} className="pop">
          <img src={meta} alt="" />
          <h2>MetaMask</h2>
        </div>
        <div onClick={walletConnect1} className="pop">
          <img src={connect} alt="" />
          <h2>Wallet Connect</h2>
        </div>
      </div>
      <div className=" flex justify-between items-center w-full py-3 px-6 absolute top-0 left-0">
        <a href="https://t.me/neilfrickindiamondhandsclub" target="blank">
          <img
            src="/telegram.png"
            className="max-w-[70px] object-contain"
            alt=""
          />
        </a>
        {}<button onClick={() => setOpen((prev) => !prev)} className="relative">
          <img src="/donut.png" className="max-w-[120px]" alt="" />
          {active ? <p className="uppercase text-white absolute top-1/2 -translate-y-1/2 left-[53%] -translate-x-1/2 leading-[1] drop-shadow-xl text-base font-black">
            Connected
          </p> : <p className="uppercase text-white absolute top-1/2 -translate-y-1/2 left-[53%] -translate-x-1/2 leading-[1] drop-shadow-xl text-base font-black">
            Connect Wallet
          </p>}
        </button>
      </div>
      <div className="flex flex-col w-[90%] max-w-[1200px] h-screen pt-[150px] min-h-[700px]  justify-start items-start">
        <div className="flex justify-start flex-col self-center items-center mt-8 md:mt-5 w-full max-w-[1000px]">
          <div className="flex justify-around items-center w-full gap-20">
            <div className="flex justify-start items-center flex-col gap-3">
              <p className="text-[#fa7fc2] uppercase text-center leading-[1] text-lg 2xl:text-xl">
                Mint <br /> <span className="text-white">one</span> tasty <br />{" "}
                <span className="text-secondary">Deezdonut</span>
              </p>
              <button onClick={mint} className="bg-[#f266b7] text-white text-xl w-16 h-16 grid place-items-center rounded-full relative drop-shadow-lg">
                <p className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2">
                  +1
                </p>
              </button>
              <p className="text-secondary uppercase text-center text-lg 2xl:text-xl">
                0.025
              </p>
            </div>
            <div className="flex justify-start items-center flex-col gap-3">
              <p className="text-[#fa7fc2] uppercase text-center leading-[1] text-lg 2xl:text-xl">
                Mint <br /> <span className="text-white">a dozen</span> <br />{" "}
                <span className="text-secondary">Deezdonutz</span>
              </p>
              <button onClick={mintDozen} className="bg-[#f266b7] text-white text-xl w-16 h-16 grid place-items-center rounded-full relative drop-shadow-lg">
                <p className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2">
                  +12
                </p>
              </button>
              <p className="text-secondary uppercase text-center text-lg 2xl:text-xl">
                0.28
              </p>
            </div>
          </div>
          <img
            onClick={() => setAddAnimation(true)}
            src="/main.png"
            alt=""
            className={`h-auto ${
              debouncedVal ? "animate-shake" : ""
            } lg:hover:animate-shake lg:focus:animate-shake lg:active:animate-shake w-full sm:w-[60%] md:-mt-10 mt-10 lg:w-auto lg:h-[46vh] lg:min-w-[330px] object-contain  max-w-[600px]`}
          />
        </div>
        <div className="flex justify-center pb-4 items-center w-full mt-auto">
          <p className="text-secondary text-center sm:text-base text-xs">
            <a href="https://t.me/neilfrickindiamondhandsclub" target="blank">
              https://t.me/neilfrickindiamondhandsclub
            </a>{" "}
            <br /> CONTACT: <br />
            <a href="mailto:NEILFRICKINDIAMONDHANDS@GMAILCOM">
              NEILFRICKINDIAMONDHANDS@GMAILCOM
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mint;

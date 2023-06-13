import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { injected, walletConnect } from "../../connectors";
import meta from "../../assets/meta.svg";
import connect from "../../assets/connect.svg";
import { useWeb3React } from "@web3-react/core";

const Mint = () => {
  const [addAnimation, setAddAnimation] = useState(false);
  const [open, setOpen] = useState(false);
  const debouncedVal = useDebounce(addAnimation, 300);
  const { activate, active, account } = useWeb3React();

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
    alert("Not released yet, check back later!");
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
              <button onClick={notReleased} className="bg-[#f266b7] text-white text-xl w-16 h-16 grid place-items-center rounded-full relative drop-shadow-lg">
                <p className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2">
                  +1
                </p>
              </button>
              <p className="text-secondary uppercase text-center text-lg 2xl:text-xl">
                0.1 BNB
              </p>
            </div>
            <div className="flex justify-start items-center flex-col gap-3">
              <p className="text-[#fa7fc2] uppercase text-center leading-[1] text-lg 2xl:text-xl">
                Mint <br /> <span className="text-white">a dozen</span> <br />{" "}
                <span className="text-secondary">Deezdonutz</span>
              </p>
              <button onClick={notReleased} className="bg-[#f266b7] text-white text-xl w-16 h-16 grid place-items-center rounded-full relative drop-shadow-lg">
                <p className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2">
                  +12
                </p>
              </button>
              <p className="text-secondary uppercase text-center text-lg 2xl:text-xl">
                1 BNB
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

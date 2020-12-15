import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ethers } from "ethers";
import IPFS from "ipfs";

import logo from "./ethereumLogo.png";
import { addresses, abis } from "@project/contracts";

import "./App.css";

const ZERO_ADDRESS =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

let node;

var dict = {};

const defaultProvider = new ethers.providers.Web3Provider(window.ethereum);
//const ipfsContract = new ethers.Contract(
 // addresses.ipfs,
  //abis.ipfs,
  //defaultProvider
//);
var storageContract;
console.log( addresses.ipfs);

async function initIpfs() {
  node = await IPFS.create();
  const version = await node.version();
  console.log("IPFS Node Version:", version.version);
}

async function readCurrentUserFile() {
 // const result = await ipfsContrstact.userFiles(
  //  defaultProvider.getSigner().getAddress()
    
  
  //);
 // console.log({ result });
 
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];//metamask current account
  
  return dict[account];
}
async function getaccount(){
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  Object.values(accounts);
  const account =JSON.stringify(accounts[0]);
  console.log("FUNC");

  console.log({ account });

return account
}


function App() {
  const [ipfsHash, setIpfsHash] = useState("");
  useEffect(() => {
    initIpfs();
    window.ethereum.enable();
  }, []);

  useEffect(() => {
    async function readFile() {
      const file = await readCurrentUserFile();

      if (file !==undefined) setIpfsHash(file);
    }
    readFile();
  }, []);


  const [accountHash, setAccountHash] = useState("");
  useEffect(() => {
    window.ethereum.enable();
  }, []);

  useEffect(() => {
    async function readFile() {
      const file1 = await getaccount();

      if (file1 !== ZERO_ADDRESS) setAccountHash(file1);
    }
     
    readFile();
  }, []);



  async function setFile(hash) {
    dict[accountHash]=hash;

   // const ipfsWithSigner = ipfsContract.connect(defaultProvider.getSigner());
   //const tx = await ipfsWithSigner.setFile(hash);
   // console.log({ tx });

    setIpfsHash(hash);
    
    //yipfsWithSigner.store(hash);

  
  }

   function SetContract() {
    storageContract = new ethers.Contract(itemInput2, abis.storage, defaultProvider);
    console.log(itemInput2);
    console.log(abis.storage);
    console.log(storageContract);

      
    try {
      if(itemInput2== "") throw "Empty! Enter Smart Contract Hash.";
      if(isNaN(itemInput2)) throw "Not a number! Enter Smart Contract Hash.";
      
    }
    catch(err) {
      console.log(err);
      document.getElementById("text-box").className = "color-red";

      document.getElementById("text-box").innerHTML = err
    }
     getfintech();
     getseller();
     getbuyer();
     getrighttovote();
    return storageContract;
  
  }


  async function Buyer() {

  
    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner.buyerUpload(ipfsHash,itemInput);
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }


  async function Seller() {


    
    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner.sellerUpload(ipfsHash);
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }

  async function Extend() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner.ExtendTime(itemInput1);
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }


  async function status() {

    var status_array=["ON", "BUYER_UPLOADED", "SELLER_UPLOADED", "DOC_OK", "DOC_DEFECT", "DOC_REJECTED","MONEY_SENT"];
    var time_array=["ON_TIME", "OUT_OF_TIME"];


    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());

      var balance = await storageWithSigner.check_Contract_Balance();

      var statust = await storageWithSigner.getStatus();

      var timet = await storageWithSigner.getTimeStatus();

      document.getElementById("text-box1").innerHTML = "Status: "+status_array[statust] +"  Time: "+ time_array[timet] +"  Balance: "+ balance
      return 
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
    
  
  }



  async function compliancetrue() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner.checkCompliance();
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }


  async function waivetrue() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner.waiveDiscrepancies(true);
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }

  async function waivefalse() {

    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner.waiveDiscrepancies(false);
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }   
  
  }
  async function destroy() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner.destroycontract();
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }

  async function moneyupload() {



    try {


      var transactionParameters = await{

        to: itemInput2.toString(), // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: '0x'+(itemInput4*1000000000000000000).toString(16)


      };
      
      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      // const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      // await storageWithSigner.Ether_Upload();
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }
  async function withdraw() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner.withdrawFunds();
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }

  async function getbuyer() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      var b = await storageWithSigner.getBuyer();
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
 
    console.log(window.ethereum.selectedAddress);
    console.log(b);
    if(window.ethereum.selectedAddress.toString().toLowerCase()==b.toString().toLowerCase()){ setOn1(true)}
    else{setOn1(false)};
    return  b;
  
  }

  async function getseller() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      var s= await storageWithSigner.getSeller();
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }


    console.log(window.ethereum.selectedAddress);
    console.log(s);
    if(window.ethereum.selectedAddress.toString().toLowerCase()==s.toString().toLowerCase()){ setOn2(true)}
    else{setOn2(false)};
    return s;
  
  }

  async function getfintech() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      var f= await storageWithSigner.getFintech();
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }

    console.log(window.ethereum.selectedAddress);
    console.log(f);
    if(window.ethereum.selectedAddress.toString().toLowerCase()==f.toString().toLowerCase()){ setOn(true)}
    else{setOn(false)};
    return f;
  }

  async function getrighttovote() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      var v = await storageWithSigner.getRightToVote(window.ethereum.selectedAddress.toString().toLowerCase());
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }

    console.log(window.ethereum.selectedAddress);
    console.log(v);
    if(v){ setOn3(true)}
    else{setOn3(false)};
    return v;
  }

  

  async function getContractFile() {

    
    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());

      var contractfile = await storageWithSigner.See_Doc_Hash(itemInput3);
      document.getElementById("myAnchor").innerHTML ="See Contract File";
      document.getElementById("myAnchor").href = `https://ipfs.io/ipfs/${contractfile}`;
      document.getElementById("myAnchor").target = "_blank";
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }

       
  
  }
  async function voteright() {

  
    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner. giveRightToVote(itemInputV.toString().toLowerCase());
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }

  async function removevoteright() {

  
    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner. removeRightToVote(itemInputV1.toString().toLowerCase());
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }

  async function endtime() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner.VotingEndTime(itemInputV3);
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }

  async function vote() {



    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());
      await storageWithSigner.vote(itemInputV4);
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
  
  }
  

  async function votingstatus() {

    var status_array=["ON", "BUYER_UPLOADED", "SELLER_UPLOADED", "DOC_OK", "DOC_DEFECT", "DOC_REJECTED","MONEY_SENT"];
    var time_array=["ON_TIME", "OUT_OF_TIME"];


    try {
      const storageWithSigner = storageContract.connect(defaultProvider.getSigner());

   

      var statust = await storageWithSigner.getStatus();

      var timevt = await storageWithSigner.getVotingTimeStatus();

      document.getElementById("text-box1").innerHTML = "Status: "+status_array[statust] +"  Time: "+ time_array[timevt] 
      return 
      
    }
    catch(err) {
      console.log(err.message);
      document.getElementById("text-box").className = "color-red";
      document.getElementById("text-box").innerHTML = err.message
    }
    
    
  
  }


  const uploadFile = useCallback(async (file) => {
    const files = [
      {
        path: file.name + file.path,
        content: file,
      },
    ];

    for await (const result of node.add(files)) {
      await setFile(result.cid.string);
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      uploadFile(acceptedFiles[0]);
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
  });

  const [itemInput, setItemInput] = useState("");
  console.log(itemInput);
  const [itemInput1, setItemInput1] = useState("");
  console.log(itemInput1);
  const [itemInput2, setItemInput2] = useState("");
  console.log(itemInput2);
  const [itemInput3, setItemInput3] = useState("");
  console.log(itemInput3);
  const [itemInput4, setItemInput4] = useState("");
  console.log(itemInput4);
  const [on, setOn] = useState(false);
  const [on1, setOn1] = useState(false);
  const [on2, setOn2] = useState(false);
  const [on3, setOn3] = useState(false);
  const [itemInputV, setItemInputV] = useState("");
  console.log(itemInputV);
  const [itemInputV1, setItemInputV1] = useState("");
  console.log(itemInputV1);
  const [itemInputV3, setItemInputV3] = useState("");
  console.log(itemInputV3);
  const [itemInputV4, setItemInputV4] = useState("");
  console.log(itemInputV4);

  
  


  
if(on){

  return (
    <div className="App">
      <header className="App-header">
      <h1>Fintech</h1>
       <div id="text-box"></div>
       <body className="info">
       <div>
          Smart Contract: <input type="text" placeholder="Contract Hash" value={itemInput2} onChange={e => setItemInput2(e.target.value)}/>
        <button onClick={SetContract}>Set</button> <button onClick={status}>See Current Status</button> 
        </div>
        <div id="text-box1"></div>
        </body>

        <body className="files">

      <div>Current User Hash: <mark className="mark-red">{accountHash}</mark></div>

      </body>

         <body className="fintech">

          <div>
          Smart Contract Files: <input type="text" placeholder="Buyer or Seller Hash" value={itemInput3} onChange={e => setItemInput3(e.target.value)}/>
          <button onClick={getContractFile}>See Contract Files</button>
          </div>
          <a id="myAnchor" href=""></a>
          </body>
          <body className="fintech">
        <div>
          Fintech Gives Right to Vote: <input type="text" placeholder="Hash" value={itemInputV} onChange={e => setItemInputV(e.target.value)}/>
        <button onClick={voteright}>Give</button>
        </div>
        <div>
          Fintech Removes Right to Vote: <input type="text" placeholder="Hash" value={itemInputV1} onChange={e => setItemInputV1(e.target.value)}/>
        <button onClick={removevoteright}>Remove</button>
        </div>
        <div>
        Fintechs Sets Voting Time:
        <input type="text" placeholder="Enter Time" value={itemInputV3} onChange={e => setItemInputV3(e.target.value)}/>
        <button onClick={endtime}>Set</button>
        </div>
         </body>
          <body className="fintech">
          <div>
          Fintech Check Compliance or Destroy Contract:  <button onClick={compliancetrue}>Check Compliance</button> <button onClick={destroy}>Destroy Contract</button>
          </div>

         </body>
         <body className="fintech">
         <div><button onClick={withdraw}>Withdraw Funds</button></div>
         </body>

      </header>

    </div>
  );
} else if(on1) {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Buyer</h1>
       <div id="text-box"></div>
       <body className="info">
       <div>
          Smart Contract: <input type="text" placeholder="Contract Hash" value={itemInput2} onChange={e => setItemInput2(e.target.value)}/>
        <button onClick={SetContract}>Set</button> <button onClick={status}>See Current Status</button> 
        </div>
        <div id="text-box1"></div>
        </body>

        <body className="files">

      <div>Current User Hash: <mark className="mark-red">{accountHash}</mark></div>

      </body>



        <div {...getRootProps()} style={{"width" : "60%", "height" : "50%", "border" : "5px solid #191b1f", "margin" : "5px","padding" : "10px",cursor: "pointer", "background-color" :"rgb(25, 27, 31, 0.3)"}}>
          <img src={logo} className="App-logo" alt="react-logo" />
          <input {...getInputProps()} />
          {isDragActive ? (
            <div>Drop the files here ...</div>
          ) : (
            <div>
              Drag 'n' drop some files here to upload to IPFS (or click the
              logo)
            </div>
          )}

        </div>
        <body className="files">

        {ipfsHash !== "" ? (   
            <div>Current IPFS Hash: <mark className="mark-red">"{ipfsHash}"</mark></div>
            
            ) : (
              ""
            )}
        <div>
          {ipfsHash !== "" ? (
            <a
              href={`https://ipfs.io/ipfs/${ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              See current user file 
            </a>
          ) : (
            "No user file set yet"
          )}

        </div>
        </body>
        <body className="buyer">
        <div>
         Buyer Sets Time and Uploads to The Contract: <input type="text" placeholder="Enter Time" value={itemInput} onChange={e => setItemInput(e.target.value)}/>
         <button onClick={Buyer}>Buyer Upload</button>
        </div>
        <div>Buyer Uploads Money to The Contract: <input type="text" placeholder="Enter ETH Amount" value={itemInput4} onChange={e => setItemInput4(e.target.value)}/><button onClick={moneyupload}>Buyer Upload Money </button></div>
        <div>
        Buyer Extends Time:
        <input type="text" placeholder="Enter Time" value={itemInput1} onChange={e => setItemInput1(e.target.value)}/>
        <button onClick={Extend}>Buyer Extend</button>
        </div>
        </body>
        <body className="buyer">
        <div>
           Buyer Waives or Terminates:  <button onClick={waivetrue}>Waive Discrepancies</button>  <button onClick={waivefalse}>Terminate The Contract</button> 
         </div>
         </body>
         <body className="buyer">
         <div><button onClick={withdraw}>Withdraw Funds</button></div>
         </body>
         </header>

</div>
);
}
else if(on2){
  return (
    <div className="App">
      <header className="App-header">
      <h1>Seller</h1>
       <div id="text-box"></div>
       <body className="info">
       <div>
          Smart Contract: <input type="text" placeholder="Contract Hash" value={itemInput2} onChange={e => setItemInput2(e.target.value)}/>
        <button onClick={SetContract}>Set</button> <button onClick={status}>See Current Status</button> 
        </div>
        <div id="text-box1"></div>
        </body>

        <body className="files">

      <div>Current User Hash: <mark className="mark-red">{accountHash}</mark></div>

      </body>



        <div {...getRootProps()} style={{"width" : "60%", "height" : "50%", "border" : "5px solid #191b1f", "margin" : "5px","padding" : "10px",cursor: "pointer", "background-color" :"rgb(25, 27, 31, 0.3)"}}>
          <img src={logo} className="App-logo" alt="react-logo" />
          <input {...getInputProps()} />
          {isDragActive ? (
            <div>Drop the files here ...</div>
          ) : (
            <div>
              Drag 'n' drop some files here to upload to IPFS (or click the
              logo)
            </div>
          )}

        </div>
        <body className="files">

        {ipfsHash !== "" ? (   
            <div>Current IPFS Hash: <mark className="mark-red">"{ipfsHash}"</mark></div>
            
            ) : (
              ""
            )}
        <div>
          {ipfsHash !== "" ? (
            <a
              href={`https://ipfs.io/ipfs/${ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              See current user file 
            </a>
          ) : (
            "No user file set yet"
          )}

        </div>
        </body>
  
         <body className="seller">
         <div>Seller Uploads to The Contract: <button onClick={Seller}>Seller Upload</button>
         </div>
         </body>
         <body className="seller">
         <div><button onClick={withdraw}>Withdraw Funds</button></div>
         </body>




      </header>

    </div>
  );
} else if(on3){
  return (
    <div className="App">
      <header className="App-header">
      <h1>Banks</h1>
       <div id="text-box"></div>
       <body className="info">
       <div>
          Smart Contract: <input type="text" placeholder="Contract Hash" value={itemInput2} onChange={e => setItemInput2(e.target.value)}/>
        <button onClick={SetContract}>Set</button> <button onClick={votingstatus}>See Current Status</button> 
        </div>
        <div id="text-box1"></div>
        </body>

        <body className="files">

      <div>Current User Hash: <mark className="mark-red">{accountHash}</mark></div>

      </body>
      <body className="banks">

      <div>
      Smart Contract Files: <input type="text" placeholder="Buyer or Seller Hash" value={itemInput3} onChange={e => setItemInput3(e.target.value)}/>
      <button onClick={getContractFile}>See Contract Files</button>
      </div>
      <a id="myAnchor" href=""></a>
      </body>

         <body className="banks">
         <div>
        Banks Vote:
        <input type="text" placeholder="Proposal" value={itemInputV4} onChange={e => setItemInputV4(e.target.value)}/>
        <button onClick={vote}>Vote</button>
        </div>

         </body>



      </header>

    </div>
  );
}
else{ 

  return (
    <div className="App">
      <header className="App-header">
      <h1>Set Contract to Login</h1>
       <div id="text-box"></div>
       <body className="info">
       <div>
          Smart Contract: <input type="text" placeholder="Contract Hash" value={itemInput2} onChange={e => setItemInput2(e.target.value)}/>
        <button onClick={SetContract}>Set</button> <button onClick={status}>See Current Status</button>
        </div>
        <div id="text-box1"></div>
        </body>

        <body className="files">

      <div>Current User Hash: <mark className="mark-red">{accountHash}</mark></div>

      </body>
      </header>

</div>
      );
}
  
}

export default App;



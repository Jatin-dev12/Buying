import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskSDK from '@metamask/sdk';
import LeftMenu from '../layout/leftmenu';
import { ethers } from "ethers";
import { human_standard_token_abi } from '../../src/beptoken.js';

 import { Web3 } from 'web3';
 var web3 = new Web3('https://bsc-dataseed1.binance.org:443');
 const MMSDK = new MetaMaskSDK({
   
    dappMetadata: {
        autoConnect: false
      
      }
 });


 //var tokenInst = new web3.eth.Contract(tokenABI,tokenAddress);




//  tokenInst.methods.balanceOf(ethereum.selectedAddress).call().then(function (bal) {
//      alert(bal);
   
//       let decimal = Math.pow(10, 18);
   
//       var balanceAmount = parseInt(bal/decimal);
//       alert(balanceAmount);
   
     
        
//     });








 
  //provider.send("eth_requestAccounts", []);







  async function pconnect(metamask_address,token_amount,stxnID)
{

 

      
    const provider = await detectEthereumProvider();

   

		var metamask_address = metamask_address;
		var txnID = stxnID;

     
	  

        var decimal = 1000000000000000000;
       //var final_amount1 = (token_amount * decimal).toString();
       var final_amount1 = token_amount.toString();
	   const decimals = 18;
	   
       const final_amount = ethers.parseUnits(final_amount1,decimals);
       console.log(final_amount);
    
       
       if (provider) {


        const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

        (async () => {

                        ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((res) => {

                var selected_ethaddress = res[0];
                //alert(selected_ethaddress);


                if(ethereum.selectedAddress == null)
                {
                    
                
                    alert("Please logged in to MetaMask extension");
                    return false;
                    
                }
                else
                {
    
                   // if(ethereum.selectedAddress == "0xf3fa60cd31e6e7667d623bc80e9c45c5ca0b4f84")
                   if(ethereum.selectedAddress == "0xdf46e2fef237224a6427174d535a1e6fadbe77b8")
                    {
                    const exampleMessage = 'sign transaction.';
    
                   
                    var network_id = parseInt(ethereum.networkVersion);
                    //alert(network_id);
    
                    if(network_id != 56)
                        {
                            alert("Please select BSC Network on Metamask");
                            return false;
                        }
                    (async () => {
                    try {
    
    
                        const provider = new ethers.BrowserProvider(window.ethereum);
                        const signer = await provider.getSigner()
                        // const signer = await ethereum.request({
                        //   method: 'personal_sign',
                        //   params: [exampleMessage, ethereum.selectedAddress, ''],
                        // });
                        
                        
                        // const msg =   `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
                          
                 
        
        
            
                        
                        console.log(signer);
                    
                       
                       
        
            const tokenAddress = "0x40225c6277b29bf9056b4acb7ee1512cbff11671";
              
            var tokenABI = human_standard_token_abi;
            console.log(tokenABI);
            console.log(signer);
             
        var token = new ethers.Contract(tokenAddress, tokenABI, signer);
            //var token = new web3.eth.Contract(tokenABI,tokenAddress,signer);
          
          // alert(metamask_address);
         
    
           token.mint(metamask_address, final_amount, txnID).then(function (detail) {
            //console.log('hhhh');
           
           
                // console.log('hhh');
                 console.log(detail);
              var mint_txnid = detail.hash;
              //var mint_txnid = "";
          
          
              
              
                  $.ajax({
          url: 'https://buytokenllc.com/bridge/bep20/ajaxcall/updateTransaction.php',
          type: 'post',
          dataType:"json",
          data: {"txnID":txnID,"mint_txnid":mint_txnid},
          success: function(result) {
           
           if(result.status == "1")
              {
          
                window.location.reload(false);
          
              }
              else
              {
              alert("Not Saved");
              }
           
              
              
                  }
              }); 
              
              
          
      })
           .catch(err => {
    
    
            console.log(err);
               alert(err.message) // TypeError: failed to fetch (the text may vary)
                $('.approve_request').html('Pending');
             $('.approve_request').attr('disabled',false);
             
             /* changing Pending Button status to In progress */
             $.ajax({
                      url: 'https://buytokenllc.com/bridge/bep20/ajaxcall/updateclickstatusback.php',
                  type: 'post',
                  dataType:"json",
                  data: {"algo_wallet_address":metamask_address,"txnID":txnID},
                  success: function(result) {
                   
                              
                      
                          }
                      });
                   /* changing Pending Button status to In progress */	
                   
                   
           
           });
          // mint call
        
                        //web3.setProvider(provider);
                        //var bepcontract= new web3.eth.Contract(tokenABI, tokenAddress,signer);
                        
                        } catch (err) {
                          console.error(err);
                          alert(err.message) 
                        
                          
                        }
    
                    })();
    
                }
                else
                {
                    alert("Please select token creator address in metamask to approve this Request");
                    return false;
    
                }
    
                  
    
    
    
                }

            } )
            .catch((err) => {
            if (err.code === 4001) {

            alert('Please connect to MetaMask.');
            } else {
            console.error(err);
            }
            });

        })();
       

      

       


        }
        else {
            alert('Please install metamask');
            
        }
 
    
    
   
   
 




          }




function ApprovedAsaToBep(){

    const navigate = useNavigate();
   // const [user, setUser] = useState('');
 
    const [stakedata,setstakedata] = useState([]);
    const [isLoading, setLoading] = useState(true);
    

    useEffect(() => {
        if(localStorage.getItem('bridgestaketoken') === '' || localStorage.getItem('bridgestaketoken') === null){
            navigate('/');
        } else {
         
    
       
            axios.get('https://buytokenllc.com/bridge/bep20/getasatobep.php')
            .then(response => {
                console.log(response.data);
                setstakedata(response.data);
            
            })
            .catch(error => {
                console.error(error);
    
            });
       
           
       
         
        }
    }, [])


    // if (isLoading) {
       
    //   return <div className="App"> <div className="loading"></div></div>;
    // }
    
    return(
        <>

<div className="loading"></div>
<div className="container-fluid main-container">



<LeftMenu />


<div className="col-md-10 content" style={{"display":"block"}}>
  			  <div className="panel panel-default">
	<div className="panel-heading">
    Request BUY (Algo) to BUY (BEP-20) Tokens
	</div>
	{/* <div className="panel-body"> */}
	
   <div className="content-container">
        
   <Table striped bordered hover>

<thead>

<tr>


<th scope='col'>Algo Address</th><th scope='col'>MetaMask Address</th><th scope='col'>Token</th><th scope='col'>Date</th><th scope='col'>Action</th>
</tr>
</thead>
<tbody id="table_records">

{stakedata.length > 0 ? (

<>

{ stakedata.map((stake_data,index) => ( 
<tr key={index+1}>
<td>
   {stake_data.source_wallet_address.substring(0,10)}********{stake_data.source_wallet_address.slice(-10)}
</td>
<td>
   {stake_data.destination_wallet_address}
</td> 
<td>
   {stake_data.token_swap}
</td>
 <td>
   {stake_data.request_date}
</td>
 <td>

{stake_data.approve_status === null && stake_data.click_approve_status === "" ? (

   <>
   <button type="button" className="btn btn-danger approve_request" data-metamask ={`${stake_data.destination_wallet_address}`} data-txn={`${stake_data.swap_transaction_id}`} data-token={`${stake_data.token_swap}`} onClick={() => pconnect(stake_data.destination_wallet_address,stake_data.token_swap,stake_data.swap_transaction_id)}>Pending</button>
   </>

) : (

<>

{stake_data.approve_status === null && stake_data.click_approve_status === "1" ? (
<>

<button type="button" className="btn btn-warning" data-metamask ={`"${stake_data.destination_wallet_address}"`} data-txn={`"${stake_data.swap_transaction_id}"`} data-token={`"${stake_data.token_swap}"`} >In Progress</button>

</>

) : (
<>
<button type="button" className="btn btn-success">Approved</button>
</>

)}


</>
)}

 
</td>

</tr>
))}      
</>
) : (

<>

</>
)}
</tbody>


    </Table>
		
	</div> 
  {/* panel-body end */}
	
</div>
  		</div>
		
		
		
		</div>


      
     



        </>
    );
}

export default ApprovedAsaToBep
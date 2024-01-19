import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";
import $ from 'jquery';

import { PeraWalletConnect } from '@perawallet/connect';
import LeftMenu from '../layout/leftmenu';
const algosdk = require('algosdk');


//const CLIENT_SERVER_URL = "https://mainnet-algorand.api.purestake.io/ps2";
//const CLIENT_SERVER_URL = "https://testnet-algorand.api.purestake.io/ps2";

const CLIENT_SERVER_URL = "https://mainnet-api.algonode.network";
const CLIENT_SERVER_PORT = "";

const algodclient = new algosdk.Algodv2('', CLIENT_SERVER_URL, CLIENT_SERVER_PORT);
//console.log(algodclient);
const peraWallet = new PeraWalletConnect();


let accountAddress = "";


function handleDisconnectWalletClick(event) {
   
    //event.preventDefault();
   
    window.location.reload(false);
    peraWallet.disconnect().catch((error) => {
      console.log(error);

    });
  
   
    
  }

  function reconnectSession() {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
  
        if (accounts.length) {
          accountAddress = accounts[0];
        }
  
        
      })
      .catch((e) => console.log(e));
  }







function pconnect(metamask_address,token_amount,algo_wallet_address,stxnID)
{


	

		

	
		var metamask_address = metamask_address;
		var txnID = stxnID;
	
		var orgntxnID = stxnID;

   
   
 if (window.confirm("Are you sure you want to Approve "+token_amount+" BUY Token")) {
  $('.loading').css('display','block');
  var decimal = 100;
   

  const to_assetId = parseInt(137020565);
    
    //const from_address = "KUXRGBY6LEUIAAX5GDFDO6DZJAKYFNLNWK454SWUHQ4EEFQ4IMQMH2MVNU";
  const from_address = "X7CL3CBICEDCP7ONSYJV2IQ5O6X7RZJB5YU7IDAYMZD2B7B53YC7WFJ4JI";
    const to_address = algo_wallet_address;

    //const amount = staking_amount;

    const staking_amount1 = parseFloat(token_amount).toFixed(2);		
		
		 
   
    const final_amount1 =100*staking_amount1;
    const final_amount = final_amount1.toFixed(2);


  // Connect handler
peraWallet
.connect()
.then((newAccounts) => {
 // Setup the disconnect event listener
 peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
// alert(newAccounts[0]);
accountAddress = newAccounts[0];

 if(from_address !== accountAddress)
 {
    
   alert("Master account not selected");
   $('.loading').css('display','none');
			$('.approve').prop('disabled',false);
		
   return false;

 }




(async () => {

    $('.loading').css('display','block');
  //console.log(accountAddress+'12312');
  
   try {    

   
   const txGroupsasset = await generateAssetTransferTxns({
    to: to_address,
    assetID: to_assetId,
    initiatorAddr: from_address,
    amount: final_amount

         });

  
         try {



           const signedTxnGroupasset = await peraWallet.signTransaction([txGroupsasset]);
           

            console.log(signedTxnGroupasset);
           
           // console.log(txGroupsasset);
           // console.log('-------');
           const {txId} = await algodclient.sendRawTransaction(signedTxnGroupasset).do();
           var txIdAsset = txId;
           console.log(txIdAsset+'aaaa');

           $.ajax({
            url: 'https://buytokenllc.com/bridge/bep20/ajaxcall/updateBurnTransactionerc.php',
          type: 'post',
          dataType:"json",
          data: {"txnID":txnID,"burn_txnid":txIdAsset},
          success: function(result) {
           
           if(result.status === "1")
            {
              
               /* changing Pending Button status to In progress */
         $.ajax({
            url: 'https://buytokenllc.com/bridge/bep20/ajaxcall/updateclickstatusback.php',
          type: 'post',
          dataType:"json",
          data: {"algo_wallet_address":algo_wallet_address,"txnID":orgntxnID},
          success: function(result) {
           
                
            
              }
            });
           /* changing Pending Button status to In progress */	
           
          
            $('.approve_request').attr('disabled',false);
                         window.location.reload(false);
            
          
            }
            else
            {
              
            alert("Not Saved");
            
            
           
            
            }
           
            
            
              }
            });
          
          
           
         
          

           
                 
           


         } catch (error) {
          
         alert(error);
            $('.loading').css('display','none');

     

         }



       } catch(error) {
        
           //alert(error); 
           alert(error);
          
           $('.loading').css('display','none');
   
           
         }
     

     })();



//console.log(accountAddress);



})
.catch((error) => {
 if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
  alert(error);
   $('.loading').css('display','none');
 }
});
$('.loading').css('display','none');


     



          }

          else
              {
                return false;
              }

          




          }


async function generateAssetTransferTxns({ to,assetID,initiatorAddr,amount}) {

    const suggestedParams = await algodclient.getTransactionParams().do();
    
    let swap_note = '{"Algo":"bridge approve"}';
      const enc = new TextEncoder();
        const note = enc.encode(swap_note);
    
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: initiatorAddr,
      to,
      assetIndex: assetID,
      amount: +amount,
      undefined, note,
      suggestedParams
    });
    
    
    return [{txn, signers: [initiatorAddr]}];
    }

function Approved(){

    const navigate = useNavigate();
   // const [user, setUser] = useState('');
 
    const [stakedata,setstakedata] = useState([]);
    const [isLoading, setLoading] = useState(true);
    

    useEffect(() => {
        if(localStorage.getItem('bridgestaketoken') === '' || localStorage.getItem('bridgestaketoken') === null){
            navigate('/');
        } else {
         
         
       
            axios.get('https://buytokenllc.com/bridge/bep20/getercbuyasa.php')
            .then(response => {
                console.log(response.data);
                setstakedata(response.data);
                setLoading(false);
                
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
  Request WBUY (ERC) to BUY (ASA) Tokens
	</div>
	<div className="content-container">
	
   <div className="loading"></div>
        
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
   {stake_data.destination_wallet_address.substring(0,10)}********{stake_data.destination_wallet_address.slice(-10)}
</td>
<td>
   {stake_data.source_wallet_address}
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
   <button type="button" className="btn btn-danger approve_request" data-metamask ={`${stake_data.source_wallet_address}`} data-txn={`${stake_data.swap_transaction_id}`} data-token={`${stake_data.token_swap}`} data-algoaddress ={`${stake_data.destination_wallet_address}`} onClick={() => pconnect(stake_data.source_wallet_address,stake_data.token_swap,stake_data.destination_wallet_address,stake_data.swap_transaction_id)}>Pending</button>
   </>

) : (

<>

{stake_data.approve_status === null && stake_data.click_approve_status === "1" ? (
<>

<button type="button" className="btn btn-warning" data-metamask ={`"${stake_data.source_wallet_address}"`} data-txn={`"${stake_data.swap_transaction_id}"`} data-token={`"${stake_data.token_swap}"`} data-algoaddress ={`"${stake_data.destination_wallet_address}"`}>In Progress</button>

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

export default Approved
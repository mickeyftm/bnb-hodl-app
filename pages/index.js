import React,{useEffect, useState} from 'react';
import { SiStencyl } from 'react-icons/si'

import Web3 from 'web3'
import artifact from './artifacts/index.json'

import { ethers } from 'ethers'


const pcsRouter = {
  // address: '0x05ff2b0db69458a0750badebc4f9e13add608c7f',
  address: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
  abi: [
    {
      inputs: [
        { internalType: 'address', name: '_factory', type: 'address' },
        { internalType: 'address', name: '_WETH', type: 'address' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'WETH',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'amountADesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBDesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'addLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        {
          internalType: 'uint256',
          name: 'amountTokenDesired',
          type: 'uint256',
        },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'addLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'factory',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveOut', type: 'uint256' },
      ],
      name: 'getAmountIn',
      outputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveOut', type: 'uint256' },
      ],
      name: 'getAmountOut',
      outputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
      ],
      name: 'getAmountsIn',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
      ],
      name: 'getAmountsOut',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveA', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveB', type: 'uint256' },
      ],
      name: 'quote',
      outputs: [{ internalType: 'uint256', name: 'amountB', type: 'uint256' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidityETHSupportingFeeOnTransferTokens',
      outputs: [
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityETHWithPermit',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
      outputs: [
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityWithPermit',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapETHForExactTokens',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactETHForTokens',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForETH',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForTokens',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapTokensForExactETH',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapTokensForExactTokens',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
  ],
}
const bnb = {
  address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  decimals: 18,
}
const busd = {
  address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  decimals: 6,
}

const provider = new ethers.providers.JsonRpcProvider("https://rpc-polygaj-mainnet.maticvigil.com/v1/654c0320abdd4f57a024704882287f917e816992")
  
const tikiContractAddress = '0x179A7676FD99D5B01C40ddA280960594A90827cf'
const tikiDecimals = 18
const tikiAbi = artifact
const tikiContract = new ethers.Contract(tikiContractAddress, tikiAbi, provider)
const pcsRouterContract = new ethers.Contract(pcsRouter.address, pcsRouter.abi, provider)


  
  async function getAmountsOut(quoteAmount, path) {
  return await pcsRouterContract.functions['getAmountsOut'](
    quoteAmount,
    path,
    { gasLimit: 1000000000000 }
  )
}

async function getTikiPrice() {
  const functionResponse = await getAmountsOut(`${1 * Math.pow(10, tikiDecimals)}`, [tikiContractAddress, bnb.address, busd.address])
  const priceInUsd = Number(functionResponse.amounts[2].toString()) / Math.pow(10, busd.decimals)
  // console.log('tiki', priceInUsd)
  return priceInUsd
}

  async function getBnbPrice() {
  const functionResponse = await getAmountsOut(`${1 * Math.pow(10, bnb.decimals)}`, [bnb.address, busd.address])
  const priceInUsd = Number(functionResponse?.amounts[1].toString()) / Math.pow(10, busd.decimals)
  // console.log('bnb', priceInUsd)
  return priceInUsd
}
  

  
  // const address = "0x63222b8120e7b72D9a39093f44cb0a9dea629132";

  

  let timer






  async function getMetamaskWallet() {
  let metamask
  try {
    metamask = new ethers.providers.Web3Provider(window.ethereum, 56);
  } catch (e) {
    console.log('wrong chain')
    return null
    }
  // Prompt user for account connections
    await metamask.send("eth_requestAccounts", []).then((res) => {

  })
  return metamask.getSigner();
  // metamask.getSigner().getAddress
}

  async function getWallet() {

  const wallet = await getMetamaskWallet()
  if (wallet === null) return


  const tikiContract = new ethers.Contract(tikiContractAddress, tikiAbi, wallet)

  const walletAddr = await wallet.getAddress()

  return [wallet, walletAddr, tikiContract]

}
  
          function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  async function getTikiVolume() {
  const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tiki-token&vs_currencies=usd&include_market_cap=false&include_24hr_vol=true&include_24hr_change=false&include_last_updated_at=false')
  const resolved = await res.json()
  const volume = resolved['tiki-token'].usd_24h_vol
  return volume
}

 

export default function Home() {

  const [wallet, setWallet] = useState(null)

  const [holdings, setHoldings] = useState(0)
  const [bnbHoldings,setBnbHoldings] = useState(0)
  const [paid, setPaid] = useState(0)
  const [lastPaid, setLastPaid] = useState(0)
  const [nextPayoutProgress, setNextPayoutProgress] = useState(0)
  const [nextPayoutValue, setNextPayoutValue] = useState(0)

  const [refreshAddressData, setRefreshAddressData] = useState(true)
  const [refreshTimeData, setRefreshTimeData] = useState(true)

  const [tikiVolume, setTikiVolume] = useState(null)
  const [bnbPrice, setBnbPrice] = useState(null)
  const [tikiPrice, setTikiPrice] = useState(null)

  const [address, setAddress] = useState(null)

  useEffect(() => {
      
    getTikiVolume().then(res => {
      setTikiVolume(res)
    })



    
    getBnbPrice().then(res => {
      setBnbPrice(res)
    })

    getTikiPrice().then(res => {
      setTikiPrice(res)
    })



           getWallet().then(wallet => {
                    setWallet(wallet[0])
                    setAddress(wallet[1])
       })
    
    if (ethers.utils.isAddress(address)) {
      if (localStorage.getItem('address') !== address) localStorage.setItem('address', address)
      callContract(address)
    }
    }, [address, refreshAddressData])
  
   const earningsInDollars = tikiVolume == 0 ? (holdings/1000000000)*220000 : (holdings/1000000000)*(tikiVolume*0.11)
  const earningsInBnb = earningsInDollars/bnbPrice
  
    const compoundedTikiAfterNDays = (starting, days) => {
    let accumulatedTiki = Number(starting)
    for (let i = 0; i < days; i++) {
      accumulatedTiki = tikiVolume == 0 ? accumulatedTiki + (((accumulatedTiki/1000000000)*220000)/bnbPrice) : accumulatedTiki + (((accumulatedTiki/1000000000)*(tikiVolume*0.11))/bnbPrice)
    }
    return accumulatedTiki.toFixed(0)
  }

    const callContract = () => {
    tikiContract.getNumberOfDividendTokenHolders().then(holders => {
      tikiContract.balanceOf(address).then(balance => {
        setHoldings((balance / 1e18).toFixed(0))
          tikiContract.getAccountDividendsInfo(address).then(result => {
            provider.getBalance(address).then(balance => {
              setBnbHoldings((balance/1e18).toFixed(4))
              setPaid( parseInt(result[4]._hex, 16) - parseInt(result[3]._hex, 16) )
              setLastPaid(parseInt(result[5]._hex, 16)*1000)
              setNextPayoutProgress((100-((parseInt(result[2]._hex, 16)/parseInt(holders._hex, 16))*100)).toFixed(0))
              setNextPayoutValue( (parseInt(result[3]._hex, 16)/1e18).toFixed(4) )
              window.clearTimeout(timer);
              timer = window.setTimeout(function(){ setRefreshAddressData(!refreshAddressData) }, 9000);
            })
          })
        })
    })
    }

  return (
    <div className="h-screen  overflow-y-scroll ">
      <div className="max-w-screen-lg mx-auto py-5 mb-10">
        <section className="">
          <div className="w-11/12  mx-auto ">
            <h1 className="text-4xl font-semibold text-black dark:text-white">TIKI Earnings Manager</h1>
            <div className="text-white text-xl flex flex-row justify-between p-3 my-3 rounded bg-purple-600">
              <div>
                <h1>Please enter your address above</h1>
              </div>
              <div>
                <h1>
                  <a href="https://polygonscan.com">Buy TIKI</a>
                </h1>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4  ">
              <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                <div className="p-4 flex items-center">
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Your TIKI Holdings</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{numberWithCommas(holdings)} TIKI</p>
                  </div>
                </div>
              </div>
              <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                <div className="p-4 flex items-center">
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total WMATIC Paid</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{numberWithCommas(paid)} WMATIC</p>
                  </div>
                </div>
              </div>
              <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                <div className="p-4 flex items-center">
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Your WMATIC Balance</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{numberWithCommas(bnbHoldings)} WMATIC</p>
                  </div>
                </div>
              </div>
              <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                <div className="p-4 flex items-center">
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Next Payout Progress</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{numberWithCommas(nextPayoutProgress)}</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 mt-4">
              <div className="p-4 flex items-center">
                <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent opacity-50 w-full h-full  " disabled type="button">Payout Is Processing</button>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-4 mt-4">

              <div className="border border-gray-300 min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 col-span-2 lg:col-span-1">
                <div className="p-4 flex flex-col text-center items-center">
                  <img className="w-32 h-32 mb-4 mt-4" src="https://bnb-hodl-app.vercel.app/dividend.png" />
                  <p className="mt-4 font-semibold text-gray-600 dark:text-gray-300 text-3xl text-center">
                    Your {numberWithCommas(holdings)} TIKI Earns in WMATIC:
                  </p>
                  <div className="flex">
                    <p className="text-green-500 dark:text-green-500 text-2xl text-center">
                      <span className="text-yellow-500">{numberWithCommas(earningsInBnb.toFixed(2))} WMATIC</span>(${numberWithCommas((earningsInDollars).toFixed(2))})
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">Per Day</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-500 dark:text-green-500 text-2xl text-center">
                      <span className="text-yellow-500">{numberWithCommas((earningsInBnb*7).toFixed(2))} WMATIC</span>(${numberWithCommas((earningsInDollars*7).toFixed(2))})
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">Per Week</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-500 dark:text-green-500 text-2xl text-center">
                      <span className="text-yellow-500">{numberWithCommas((earningsInBnb*30).toFixed(2))} WMATIC</span>(${numberWithCommas((earningsInDollars*30).toFixed(2))})
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">Per Month</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-500 dark:text-green-500 text-2xl text-center">
                      <span className="text-yellow-500">{numberWithCommas((earningsInBnb*365).toFixed(2))} WMATIC</span>(${numberWithCommas((earningsInDollars*365).toFixed(2))})
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">Per Year</span>
                    </p>
                  </div>
                  <br />
                  <p className="text-gray-600 py-1 dark:text-gray-400 text-xl text-center -mt-2">Dynamic estimations based on 24h of trading volume 30,000
                  </p>
                </div>
              </div>



              <div className="border border-gray-300 min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 col-span-2 lg:col-span-1">
                <div className="p-4 flex flex-col text-center items-center">
                  <img className="w-32 h-32 mb-4 mt-4" src="https://bnb-hodl-app.vercel.app/dividend.png" />
                  <p className="mt-4 font-semibold text-gray-600 dark:text-gray-300 text-3xl text-center">
                    By Reinvest your WMATIC to TIKI, Your funds will grow...
                  </p>
                  <div className="flex">
                    <p className="text-green-500 dark:text-green-500 text-2xl text-center">
                      <span className="text-yellow-500">{holdings != 0 ? numberWithCommas(compoundedTikiAfterNDays(holdings, 7)) : '0'} TIKI</span>($0.00)
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">In a Week</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-500 dark:text-green-500 text-2xl text-center">
                      <span className="text-yellow-500">{holdings != 0 ? numberWithCommas(compoundedTikiAfterNDays(holdings, 30)) : '0'} TIKI</span> ({holdings != 0 ? (compoundedTikiAfterNDays(holdings, 30)/holdings).toFixed(2) : '0'}x Earnings)
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">In a Month</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-500 dark:text-green-500 text-2xl text-center">
                      <span className="text-yellow-500">{holdings != 0 ? numberWithCommas(compoundedTikiAfterNDays(holdings, 182)) : '0'} TIKI</span>({holdings != 0 ? (compoundedTikiAfterNDays(holdings, 182)/holdings).toFixed(2) : '0'}x Earnings)
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">In 6 Months</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-500 dark:text-green-500 text-2xl text-center">
                      <span className="text-yellow-500">{holdings != 0 ? numberWithCommas(compoundedTikiAfterNDays(holdings, 365)) : '0'} TIKI</span>({holdings != 0 ? (compoundedTikiAfterNDays(holdings, 365)/holdings).toFixed(2) : '0'}x Earnings)
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">In 1 Year</span>
                    </p>
                  </div>
                  <br />
                  <p className="text-gray-600 py-1 dark:text-gray-400 text-xl text-center -mt-2">Estimations are based on current TIKI price (${tikiPrice?.toFixed(6)})
                  </p>
                </div>
              </div>
            </div>
            <br />
            <div className="border border-gray-300 min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 col-span-2">
                <div className="p-4 flex flex-col text-center items-center">
                  <img className="w-32 h-32 mb-4 mt-4" src="https://bnb-hodl-app.vercel.app/polygon.png" />
                  <p className="mt-4 font-semibold text-gray-600 dark:text-gray-300 text-3xl text-center">Total WMATIC Paid To TIKI Holders</p>
                  <p className="text-green-500 dark:text-green-500 text-4xl md:text-6xl text-center mb-8">
                    0
                    <span className="text-yellow-500">WMATIC</span>
                    <br />
                    =$0
                  </p>
                  <br />
                  <p className="text-gray-600 py-1 dark:text-gray-400 text-xl text-center -mt-2">It will be updated at 3pm UTC everyday.</p>
                </div>
             </div>
          </div>
          <br />
        </section>

            </div>
    
    </div>
  )
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/// @title ERC20 Contract
import "./AgentRates.sol";

contract Transactions is Rates{
    constructor() {
    }

    function addAgentRateTransaction(address _patreonKey, address _sponsorKey, uint _sponsorRate, address _agentKey, uint _agentRateKey, uint256 _transAmount)
    public onlyOwnerOrRootAdmin(msg.sender) {
        uint256 transactionTimeStamp = block.timestamp;
        // console.log("ADDING RATE REC = ",_agentRateKey, "ADDING TRANSACTION = ",_transAmount);
        addAgentRate(_patreonKey, _sponsorKey, _sponsorRate, _agentKey, _agentRateKey);
    //    AgentRateStruct storage agentRateKey = getRateRecordByKeys(_patreonKey, _sponsorKey, _agentKey, _agentRateKey);

        AccountStruct storage accountRec = accountMap[_patreonKey];
        SponsorStruct storage sponsorRec = accountRec.sponsorMap[_sponsorKey];
        AgentStruct storage agentRec = sponsorRec.agentMap[_agentKey];
        AgentRateStruct storage agentRateKey = agentRec._agentRateMap[_agentRateKey];
// console.log("accountRec.stakedSPCoins = ",accountRec.stakedSPCoins, "Adding ",_transAmount);
// console.log("   sponsorRec.totalAgentsSponsored = ",sponsorRec.totalAgentsSponsored, "Adding ",_transAmount);
// console.log("      agentRec.totalRatesSponsored = ",agentRec.totalRatesSponsored, "Adding ",_transAmount);
// console.log("         agentRateKey.totalTransactionsSponsored = ",agentRateKey.totalTransactionsSponsored, "Adding ",_transAmount);
        accountRec.stakedSPCoins += _transAmount;
        sponsorRec.totalAgentsSponsored += _transAmount;
        agentRec.totalRatesSponsored += _transAmount;
        agentRateKey.totalTransactionsSponsored += _transAmount;
        /**/
        // console.log("agentRateKey.inserted", agentRateKey.inserted);  

        agentRateKey.lastUpdateTime = transactionTimeStamp;
        TransactionStruct memory transRec = TransactionStruct(
            {insertionTime: transactionTimeStamp, quantity: _transAmount});
        TransactionStruct[] storage transactionList = agentRateKey.transactionList;
        transactionList.push(transRec);
    }
}

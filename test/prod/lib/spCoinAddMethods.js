const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct } = require("./dataTypes");
const {} = require("./utils/serialize");

let spCoinContractDeployed;

setStructureContract = (_spCoinContractDeployed) => {
    spCoinContractDeployed = _spCoinContractDeployed;
}

getAccountRecords = async() => {
    logFunctionHeader("getAccountRecords()");
    let accountArr = [];
    let accountKeys = await spCoinContractDeployed.getAccountKeys();

    for (let i in accountKeys) {
        let accountStruct = await getAccountRecord(accountKeys[i]);
        accountArr.push(accountStruct);
    }
    return accountArr;
}

getAccountRecord = async (_accountKey) => {
    let accountStruct = await getSerializedAccountRecord(_accountKey);
    accountStruct.accountKey = _accountKey;
    accountSponsorKeys = await getAccountSponsorKeys(_accountKey);
    accountStruct.accountSponsorKeys = accountSponsorKeys;
    accountStruct.accountSponsorRecords = await getSponsorRecordsByKeys(_accountKey, accountSponsorKeys);
    accountStruct.accountPatreonKeys = await getAccountPatreonKeys(_accountKey);
    accountStruct.accountAgentKeys = await getAccountAgentKeys(_accountKey);
    accountStruct.accountParentSponsorKeys = await getAccountParentSponsorKeys(_accountKey);
    return accountStruct;
}

addPatreonSponsor = async (_accountKey, _sponsorKey) => {
    logFunctionHeader(
      "addPatreonSponsor = async(" + _accountKey + ", " + _sponsorKey + ")"
    );
  
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Inserting " + _sponsorKey + " Sponsors To Blockchain Network"
    );
  
    logDetail("JS => Inserting Sponsor " + _sponsorKey );
    await spCoinContractDeployed.addPatreonSponsor(_accountKey, _sponsorKey);
  };
  
  addPatreonSponsors = async (_accountKey, _accountSponsorKeys) => {
    logFunctionHeader(
      "addPatreonSponsors = async(" + _accountKey + ", " + _accountSponsorKeys + ")"
    );
  
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Adding " + _accountSponsorKeys.length + " Sponsors To Blockchain Network"
    );
  
    let sponsorCount = 0;
    for (sponsorCount; sponsorCount < _accountSponsorKeys.length; sponsorCount++) {
      let _sponsorKey = _accountSponsorKeys[sponsorCount];
      await addPatreonSponsor(_accountKey, _sponsorKey);
    }
    logDetail("JS => Inserted = " + sponsorCount + " Sponsor Records");
    return --sponsorCount;
  };

  addSponsorAgent = async (_accountKey, _sponsorAccountKey, _accountAgentKey) => {
    logFunctionHeader(
      "accountAgentKey = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKey + ")"
    );
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => Adding Agent " + _accountAgentKey + " To Blockchain Network");
  
    logDetail("JS =>  " + _accountKey + ". " + "Inserting Agent[" + _accountKey + "]: " + _accountAgentKey );
    await spCoinContractDeployed.addSponsorAgent( _accountKey, _sponsorAccountKey, _accountAgentKey );
    logDetail("JS => "+ "Added Agent " + _accountAgentKey + " Record to SponsorKey " + _sponsorAccountKey);
  };
  
  addSponsorAgents = async (_accountKey, _sponsorAccountKey, _accountAgentKeys) => {
    logFunctionHeader(
      "addSponsorAgents = async(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKeys + ")"
    );
    logDetail("JS => For Account[" + _accountKey + "]: " + _accountKey + ")");
    logDetail("JS => For Sponsor[" + _sponsorAccountKey + "]: " + _sponsorAccountKey + ")");
    logDetail("JS => Inserting " + _accountAgentKeys.length + " Agents To Blockchain Network"
    );
    logDetail("JS => _accountAgentKeys = " + _accountAgentKeys);
  
    let agentSize = _accountAgentKeys.length;
    logDetail("JS => agentSize.length = " + agentSize);
    let agentCount = 0;
    for (let agentCount = 0; agentCount < agentSize; agentCount++) {
      let agentAccountKey = _accountAgentKeys[agentCount];
      logDetail("JS =>  " + agentCount + ". " + "Inserting Agent[" + agentCount + "]: " + agentAccountKey );
      await addSponsorAgent( _accountKey, _sponsorAccountKey, agentAccountKey );
    }
    logDetail("JS => "+ "Inserted = " + agentSize + " Agent Records");
    return agentCount;
  };
  
getSerializedAccountRecord = async (_accountKey) => {
    logFunctionHeader("getSerializedAccountRecord = async(" + _accountKey + ")");
    let serializedAccountRec =
      await spCoinContractDeployed.getSerializedAccountRec(_accountKey);
    return deSerializedAccountRec(serializedAccountRec);
  };

addAccountRecord = async (_accountKey) => {
    logFunctionHeader("addAccountRecord = async(" + _accountKey + ")");
    logDetail("JS => Inserting Account " + _accountKey + " To Blockchain Network");
    await spCoinContractDeployed.addAccountRecord(_accountKey);
  };  

addAccountRecords = async (_accountListKeys) => {
    logFunctionHeader("addAccountRecord = async(arrayAccounts)");
    let maxCount = _accountListKeys.length;
    logDetail("JS => Inserting " + maxCount + " Records to Blockchain Network");
  
    for (idx = 0; idx < maxCount; idx++) {
      let account = _accountListKeys[idx];
      logDetail("JS => Inserting " + idx + ", " + account);
      await spCoinContractDeployed.addAccountRecord(account);
    }
    logDetail("JS => Inserted " + maxCount + " Accounts to Blockchain Network");
  
    return maxCount;
};
  //////////////////// LOAD ACCOUNT DATA //////////////////////
getSponsorsByAccount = async(_accountKey) => {    
    logFunctionHeader("getSponsorsByAccount("  + _accountKey + ")");
    accountSponsorKeys = await getAccountSponsorKeys(_accountKey);
    accountSponsorRecords = await getSponsorRecordsByKeys(_accountKey, accountSponsorKeys);
    return accountSponsorRecords;
}

//////////////////// LOAD SPONSOR DATA //////////////////////

getSponsorRecordsByKeys = async(_accountKey, _accountSponsorKeys) => {
    logFunctionHeader("getSponsorRecordsByKeys(" + _accountKey + ", " + _accountSponsorKeys + ")");
    let accountSponsorRecords = [];
    for (let [idx, sponsorAccountKey] of Object.entries(_accountSponsorKeys)) {
        logDetail("JS => Loading Sponsor Record " + sponsorAccountKey, idx);
        let sponsorStruct = await getSponsorRecordByKeys(_accountKey, sponsorAccountKey);
        sponsorStruct.index = idx;
        accountSponsorRecords.push(sponsorStruct);
    }
    return accountSponsorRecords;
}

getSponsorRecordByKeys = async(_accountKey, _sponsorAccountKey) => {
    logFunctionHeader("getSponsorRecordByKeys(" + _accountKey + ", " + _sponsorAccountKey + ")");
    let accountAgentKeys = await getAgentRecordKeys(_accountKey, _sponsorAccountKey);
    let sponsorStruct = new SponsorStruct(_sponsorAccountKey);
    let sponsorKeys = await spCoinContractDeployed.getSponsorKeys(_accountKey);
    sponsorStruct.sponsorAccountKey = _sponsorAccountKey;
    sponsorStruct.accountAgentKeys = accountAgentKeys;
    sponsorStruct.agentRecordList = await getAgentRecordsByKeys(_accountKey, _sponsorAccountKey, accountAgentKeys);
    return sponsorStruct;
}

getAgentsByPatreonSponsor = async(_accountKey, _sponsorAccountKey) => {
    logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _sponsorAccountKey + ")");
    let accountAgentKeys = await getAgentRecordKeys(_accountKey, _sponsorAccountKey);
    let agentRecordList = await getAgentRecordsByKeys(_accountKey, _sponsorAccountKey, accountAgentKeys);
    return agentRecordList;
}

//////////////////// LOAD SPONSOR RATE DATA //////////////////////

getSponsorRatesByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Sponsor Rates";
}

getSponsorRateByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
    // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Sponsor Rate";
}

//////////////////// LOAD SPONSOR TRANSACTION DATA //////////////////////

getSponsorTransactionsByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Sponsor Transactions";
}

getSponsorTransactionKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
    // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Sponsor Transaction";
}

//////////////////// LOAD AGENT DATA //////////////////////

getAgentRecordsByKeys = async(_accountKey, _sponsorAccountKey, _accountAgentKeys) => {
    logFunctionHeader("getAgentRecordsByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _accountAgentKeys + ")");
    let agentRecordList = [];
    for (let [agentAccountKey, idx] of Object.entries(_accountAgentKeys)) {
        logDetail("JS => Loading Agent Records " + agentAccountKey, idx);
        let agentStruct = await getAgentRecordByKeys(_accountKey, _sponsorAccountKey, agentAccountKey);
        agentStruct.index = idx;
        agentRecordList.push(agentStruct);
    }
    return agentRecordList;
}

getAgentRecordByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    logFunctionHeader("getAgentRecordByKeys(" + _accountKey + ", " + _sponsorAccountKey + ", " + _agentAccountKey + ")");
    // let agentIndex = await spCoinContractDeployed.getAgentIndex(_accountKey, _sponsorAccountKey, agentAccountKey);
    // let agentActIdx = await spCoinContractDeployed.getAccountIndex(agentAccountKey);
    agentStruct = new AgentStruct();
    agentStruct.agentAccountKey = _agentAccountKey;
    //agentStruct.agentRecordList = await spCoinContractDeployed.getAgentRecordByKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);
    agentStruct.rates = ratesByAccountAgents = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _agentAccountKey);
    return agentStruct;
}

//////////////////// LOAD AGENT RATE DATA //////////////////////

getAgentRatesByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Agent Rates";
}

getAgentRateByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
    // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Agent Rate";
}

//////////////////// LOAD AGENT TRANSACTION DATA //////////////////////

getAgentTransactionsByKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey) => {
    // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Agent Rate Transactions";
}

getAgentTransactionKeys = async(_accountKey, _sponsorAccountKey, _agentAccountKey, _rateKey) => {
    // logFunctionHeader("getAgentsByPatreonSponsor = async(" + _accountKey + ", " + _rateRecordKey + ")");
    // let agentRateKeys = await getAgentRateKeys(_accountKey, _rateRecordKey);
    // let agentRateRecordList = await getAgentRatesByKeys(_accountKey, _sponsorAccountKey, _rateRecordKey);
    // return agentRateRecordList;
    return "ToDo Agent Rate Transaction";
}

//////////////////// MODULE EXPORTS //////////////////////

module.exports = {
    addAccountRecord,
    addAccountRecords,
    addPatreonSponsors,
    addSponsorAgent,
    addSponsorAgents,
    getAccountRecord,
    getAccountRecords,
    getAgentRateByKeys,
    getAgentRatesByKeys,
    getAgentRecordByKeys,
    getAgentRecordsByKeys,
    getAgentsByPatreonSponsor,
    getSerializedAccountRecord,
    getSponsorRateByKeys,
    getSponsorRatesByKeys,
    getSponsorRecordByKeys,
    getSponsorRecordsByKeys,
    getSponsorsByAccount,
    setStructureContract,
}

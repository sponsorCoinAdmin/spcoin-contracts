# dev-contracts-spCoin

// TESTING

// VISUAL STUDIO CODE INSTALL PLUGIN
Nomic Foundation

// INSTALLING HARDHAT
npm install --save-dev hardhat

//REQUIRED SUPPORT PACKAGES
"@nomicfoundation/hardhat-toolbox": "^2.0.1"
npm install --save-dev @nomicfoundation/hardhat-toolbox  @nomiclabs/hardhat-ethers 'ethers@^5.0.0'

Add the following code snippet at the top of your hardhat.config.js file
require("@nomicfoundation/hardhat-toolbox");

npm audit fix --force

// IMPORTANT HARDHAT GLOBAL COMMANDS
npx hardhat help

dataStructureModel Inheritance Level
SPCoin
  Token
      Staking Manager
        Transactions
          AgentRates
            Agent
              RecipientRates
                Recipient
                  Account



To Add a Recipient Account Agent, add the following:
Add a Rate Record to Agent

Using: addAgents(Recipient, SponsroRate, [Agent])
Example: addAgents(2, 10, [6]); 

Add a Rate Record to Recipient
================================================
Create:  AddRecipientRate(Account, Recipient, RecipientRatePercent);
Example: AddRecipientRate(1, 2, 10);

Add a Rate Record to Recipient
================================================
Create: AddAgentRate(Account, Recipient, Agent, RecipientRatePercent, AgentRatePercent);
Example: AddAgentRate(1, 2, 6, 10, 10);

Add a Recipient Transaction
================================================
Create AddRecipientTransaction(Account, Recipient, RecipientRate, amount);
Example: AddRecipientTransaction(1, 2, 10, 123.1230);

Add an Agent Transaction
================================================
Create addSponsorship(Recipient, RecipientRate, Agent, AgentRate, Amount)
Example: AddAgentRate(1, 2, 6, 10, 10, 123.1230);


Requirements to Delete Agent: Agent Affiliation Program
1. Require Agent to be child of Recipient
2. Require Agent to have No RecipientCoin balanceOf Token affiliation with Parent.
3. Must Remove from parent Recipient.agentAccountList
4. Then Remove Recipient Parent from agentAccount.agentParentRecipientAccountList
5. Optional, If Agent account balanceOf is zero (0), Agent account may be deleted.

Requirements to Delete Recipient from Sponsor: (Delete Sponsor recipientship)
1. Require Recipient to be Child of Sponsor
2. Require Recipient to have no Parent Patrion balanceOf Token affiliation.
3. Require Recipient to have no Child Agent affiliation
4. Remove associated child agents from Recipient.agentAccountList
5. Remove from Account ParentKeys, account.recipientAccountList
6. Remove from Account.recipientMap, 
7. Optional, If Recipient account balanceOf is zero (0), Recipient account may be deleted.

Requirements to Delete Account
1. Require Account to have No Recipient, account.recipientAccountList must be zero (0).
2. Require Account to have No Agent, account.agentAccountList must be zero (0).
3. Optional, Require Account to have No Sponsors account.sponsorAccountList must be zero (0).
4. Optional, Require Account to have No account.agentParentRecipientAccountList must be zero (0).


# ToDo dev-contracts-spCoin  *** Add the Following Structures to this README.md File 
---
### Directory of Information
Find your way using the directory below:
<b>
- [Legal Disclaimer & Copyright Agreement ©](#copyright-agreement)
- [Repository](#repository-information)
- [About](#about)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Package Contents](#package-contents)
- [Command Menu Shortcuts](#command-menu-shortcuts)
- [Running the Package](#running-the-package)
- [Video Tutorial](#video-tutorial)
- [About the Author](#about-the-author)
 </b>
 
 Name  | Key Contact
------------- | -------------
Robert Lanson | sponsorcoin@yahoo.com

- - - -
### Copyright Agreement<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/policeman.png" width="5%" align= "right">
<b>Package [<b>dev-contracts-spCoin</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main) ©</b> 

Read all copyright clauses and information before continuing to download and/or interact with this software. All interaction and use of such software hereon forward assumes complete agreement to all copyright terms and general conditions as specified. 

- This program is permissible for re-distribution provided this copyright/license header is present in any redistribution of this package, in partial or entirely.  
- There exists no warranty or guaranty of any kind in any way and is not assured to be as required and may not work exactly as designed for all operating systems employing various potentially conflicting software programs and entities.  
- It is recommended to read the contents of the scripts to be assured of the installation process and what will be installed. 
- The user is free to modify the code as required. 
- There may not be any associated uninstal script. Uninstalling any such software or its effects on any system is the system owners responsibility.
- It is recommended to be installed on a test system in a test environment before promoting to a production environment.
- There is absolutely no guarantee of profit in any way, implying there should not be any expectation of financial gain while utilizing this application and associated development kit.</b><img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main//caution.png" width="6%" align= "right"></b>

<b>**INSTALL AT YOUR OWN RISK: END OF DISCLAIMER</b>
 - - - -
### Repository Information<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/repository.png" width="5%" align= "right">
- <b>https://github.com/sponsorCoinAdmin/dev-contracts-spCoin</b>

- - - -
### About<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/aboutMickey.png" width="6%" align= "right">
- Version: 1.0.0
- Release Date: Dec 1st. 2024
- Purpose: [<b>dev-contracts-spCoin</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main) is a WIP GUI front end package to demonstrate blockchain connectivity and transactions.
- Description: [<b>dev-contracts-spCoin</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main) package is a front end GUI package mimicking Uniswap's appearance and utilizing Uniswap’s SDK to perform price matching and trade transactions. 
 - - - -
### Installation Details<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/installation.png" width="7%" align= "right">
- Please Note: For a comprehensive demonstration of the installation process, refer to the 'Video Tutorial' section below.
- Clone the package to your local computer:
- Change your current directory to {root installaction}/[<b>dev-contracts-spCoin</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main)
- Next install the text menu driven system as follows:
    - execute the following command: <b>'. ./[<b>spCoinEnvSetup.sh</b>'](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/blob/main/spCoinEnvSetup.sh)</b>
- <b>Notes:
    - This installation assumes operation under bash or gitBash for windows</b>
    - The Menu System modifies the ~/.gitbash.rc file to and an environment path link
### Environment setup<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/setup6.png" width="7%" align= "right">
- Setup for the simple swap test requires setting up environment .env file.
- A sample configuration file <b>.env</b> exists in  project's home directory <b>/dev-contracts-spCoin</b>.
- This file, <b>".env"</b> requires you key to be added for network access.
- For example, an Infura key entry would look look like:
  - <b>NFURA_API_MAIN_NET_ACCESS_KEY="<Your Infura Key Here></b>"
- Further environment settings exist in the file <b>/dev-contracts-spCoin/env/.e</b>.
 - - - - 
### Command Menu Shortcuts<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/menu 4.jpg" width="7%" align= "right">
The <b>All Command Menus</b> are a list of shortcut alias commands for administering the [<b>'dev-contracts-spCoin'</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main) project.
- If the menu system is installed correctly, simply type short cut alias <b>'m \<enter>'</b> in a bash window and the following should appear:
#### The Main Menu
![<b>Author Image</b>](https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/mainMenu.jpg)
The above menu is simply a menu of many submenus. Each entry is an alias to an alternate command menu short cut. Each submenu exists under the repositories’ dev-contracts-spCoin/env directory. These menus cane be more completely described in the file [<b>./setupEnv/ReadMe.md</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/blob/main/README.md).

- - - -
### Package Contents<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/contents.png" width="6%" align= "right">
- [<b>README.md</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/edit/main/README.md) ~ The Readme Documentation is this documentation.
- [<b>./scripts/spCoinSetup.sh</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/blob/main/scripts/spCoinSetup.sh)  ~ This file is to be run from the scripts directory and downloads the [<b>dev-contracts-spCoin</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main</b>) repository to local. Next it executes the [<b>spCoinEnvSetup.sh</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/blob/main/spCoinEnvSetup.sh) file for environment setup.
- [<b>./setupEnv/</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/tree/ef96401c818432d0fe6ff1d6642fab31f44b6fb5) ~ This directory is a mounted submodule containing files for environment and menu execution commands. refer to the [<b>./setupEnv/ReadMe.md</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/blob/main/README.md) for a more complete Overview.
- [<b>./setupEnv/spCoinEnvSetup.sh</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv) ~ This shell creates the environment variable settings and sets up the menus for testing and execution commands in [<b>'dev-contracts-spCoin'</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main).
 - - - -
 ### Command Menu Shortcuts<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/menu 4.jpg" width="7%" align= "right">
The <b>All Command Menus</b> are a list of shortcut alias commands for administering the [<b>'dev-contracts-spCoin'</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main) project.
- If the menu system is installed correctly, simply type short cut alias <b>'m \<enter>'</b> in a bash window and the following should appear:
- - - -
#### The Main Menu
![<b>Author Image</b>](https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/mainMenu.jpg)
The above menu is simply a menu of many submenus. Each entry is an alias to an alternate command menu short cut. Each submenu exists under the repositories’ dev-contracts-spCoin/env directory. These menus cane be more completely described in the file [<b>./setupEnv/ReadMe.md</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/blob/main/README.md).
 - - - -
### Running the Package<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/running2.png" width="6%" align= "right">

It is recommended to read the contents of the scripts to be assured of the installation process and what will be installed. There may not be an associated uninstalling script, so uninstalling is the owner’s responsibility.
- Validate the .env file was added to the package directory [<b>/dev-contracts-spCoin</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main).<BR>This adds the required network access keys.
After a new Linux/gitBash successful installation you can start the program directly in two ways as follows:
1. cd into the Package [<b>/dev-contracts-spCoin</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main) and execute the command <b>'npm start'</b>.
2. Running the test menu display, <b>'tm'</b>, command will list the testing options.
   Running the alias menu command <b>'hhtest'</b> will start the [<b>dev-contracts-spCoin</b>](https://github.com/sponsorCoinAdmin/dev-contracts-spCoin/tree/main) package test.
 - - - -
### Video Tutorial<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/video.png" width="5%" align= "right">
- Comprehensive Video Tutorial Currently Under Construction. Resource will be posted as soon as it is ready for publication.

<b>[![ToDo](https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/maxresdefault.jpg)]</b>(https://youtu.be/T_d5-y8hpYI "<b>dev-contracts-spCoin</b> ~ A brief overview")

### About the Authors
![<b>Author Image</b>](https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/RobinPhoto.jpg)
- Name: Robert Lanson
- Position Lead Architect/CEO
- Email: <b>sponsorcoin@yahoo.com</b>

[<b>Back To The Top</b>](#directory-of-information)


const Contacts = artifacts.require("voting.sol");

module.exports = function(deployer) {
  deployer.deploy(Contacts);
};
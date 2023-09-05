const Contacts = artifacts.require("voting.sol");
const Feedback = artifacts.require("feedback.sol");
module.exports = function(deployer) {
  deployer.deploy(Contacts);
  deployer.deploy(Feedback);
};
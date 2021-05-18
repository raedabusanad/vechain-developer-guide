const Greet = artifacts.require("Greet");

module.exports = function (deployer) {
  deployer.deploy(Greet);
};

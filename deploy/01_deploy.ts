import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer, tokenOwner } = await getNamedAccounts();

  const UniswapV2Library = await deploy("UniswapV2Library", {
    from: deployer,
  });

  await deploy("UniswapRouter", {
    from: deployer,
    args: [tokenOwner, tokenOwner],
    log: true,
    libraries: {
      UniswapV2Library: UniswapV2Library.address,
    },
  });
};
export default func;
func.tags = ["UniswapRouter"];

const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();


    // good luck
    let wallet = ethers.Wallet.createRandom();

    while (wallet.address > '0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf') {
      wallet = ethers.Wallet.createRandom();
    }

    console.log(wallet.address)

    let signer = await ethers.provider.getSigner(0);

    await signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther('1')
    });

    const walletWithProvider = wallet.connect(ethers.provider);

    // console.log(await wallet.getBalance())


    await game.connect(walletWithProvider).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});

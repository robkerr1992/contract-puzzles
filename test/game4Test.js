const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    const signer = ethers.provider.getSigner();

    // nested mappings are rough :}
    await game.write(await signer.getAddress());

    await game.win(await signer.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});

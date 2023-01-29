// テストのアサーションを記述するためのライブラリ Chai を読み込み、expect アサーションを定義する。
const chai = require("chai");
const expect = chai.expect;

// BN.js による長整数の比較ができるように chai-bn ライブラリを読み込む。
// expect(ACTUAL).to.be.a.bignumber.that.equals(EXPECT) などのような記述ができる。
const BN = require("bn.js");
chai.use(require("chai-bn")(BN));

const { accounts, contract } = require("@openzeppelin/test-environment");
const { constants, expectEvent } = require("@openzeppelin/test-helpers");

// テスト用アドレスを 2 つ読み込む。
// 最初のアカウントはコントラクト所有者、2 つ目は Alice という架空のアカウントとして利用する。
const [deployer, alice] = accounts;

// ビルドしたコントラクトを読み込む。
const HelloContract = contract.fromArtifact("Hello");

describe("Hello NFT のテスト", () => {
    let instance;

    beforeEach(async () => {
        // ブロックチェーンに deployer アカウントから Hello NFT をデプロイする。
        instance = await HelloContract.new({ from: deployer });
    });

    it("Alice にトークンを発行します。", async () => {
        // Alice からコントラクト宛に 1 ETH を送付して、Alice 宛に ID: 1 のトークンを発行させる。
        const ether = new BN(10).pow(new BN(18));
        const mintTx = instance.send(ether, { from: alice });
        expectEvent(await mintTx, "Transfer", {
            from: constants.ZERO_ADDRESS,
            to: alice,
            tokenId: new BN(1),
        });

        // Alice アカウントのトークン所有数が 1 になっていることを確認する。
        expect(await instance.balanceOf(alice)).to.be.a.bignumber.that.equals(new BN(1));
    });
});

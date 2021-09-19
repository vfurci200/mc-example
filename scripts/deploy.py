from brownie import BaseContract, accounts, interface, config,chain



def main():

    # dev = accounts.from_mnemonic(config["wallets"]["from_mnemonic"])
    # dev = accounts.at('0x474bafA6db6C7c452422Ff30C60538FecE385332',force=True)
    dev = accounts[0]


    contract = BaseContract.deploy({'from': accounts[0]})

    # get usdc
    usdc = interface.IERC20Minimal('0x2791bca1f2de4661ed88a30c99a7a9449aa84174')
    uniswap_usdc_exchange= interface.IUniswapV2Exchange('0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff')

    uniswap_usdc_exchange.swapExactETHForTokens(
            1,  # minimum amount of tokens to purchase
            ['0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270','0x2791bca1f2de4661ed88a30c99a7a9449aa84174'],
            accounts[2],
            9999999999,  # timestamp
            {
                "from": accounts[2],
                'value': "99 ether"
            }
        )
    uniswap_usdc_exchange.swapExactETHForTokens(
            1,  # minimum amount of tokens to purchase
            ['0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270','0x2791bca1f2de4661ed88a30c99a7a9449aa84174'],
            accounts[3],
            9999999999,  # timestamp
            {
                "from": accounts[3],
                'value': "99 ether"
            }
        )
    uniswap_usdc_exchange.swapExactETHForTokens(
            1,  # minimum amount of tokens to purchase
            ['0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270','0x2791bca1f2de4661ed88a30c99a7a9449aa84174'],
            accounts[5],
            9999999999,  # timestamp
            {
                "from": accounts[5],
                'value': "99 ether"
            }
        )
    uniswap_usdc_exchange.swapExactETHForTokens(
            1,  # minimum amount of tokens to purchase
            ['0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270','0x2791bca1f2de4661ed88a30c99a7a9449aa84174'],
            accounts[7],
            9999999999,  # timestamp
            {
                "from": accounts[7],
                'value': "99 ether"
            }
        )

    # usdc.approve(baseContract,100*10**6,{'from':accounts[2]})
    # chain.sleep(999999999999999)
    # chain.mine(1)
    # print("Winning vote is: {}".format(winner))

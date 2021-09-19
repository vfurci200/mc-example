from brownie import accounts, Contract, BaseContract, chain
from brownie.test import given, strategy
import pytest


# @given(amount=strategy('uint256', max_value=10**18))

###############
@pytest.fixture(autouse=True)
def doSomething( accounts):
    pass

# get usdc
@pytest.fixture(scope="session")
def usdc(interface):
    yield interface.IERC20Minimal('0x2791bca1f2de4661ed88a30c99a7a9449aa84174')

@pytest.fixture(scope="session")
def uniswap_usdc_exchange(interface):
    yield interface.IUniswapV2Exchange('0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff')

@pytest.fixture(autouse=True)
def buy_usdc(accounts, usdc,uniswap_usdc_exchange):
    dev = accounts.at('0x474bafA6db6C7c452422Ff30C60538FecE385332',force=True)
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


@pytest.fixture(autouse=True)
def def_setters(baseContract, accounts):
    # set contracts
    pass

###############

@pytest.mark.skip(reason="In")
def test(accounts, usdc):
    # test stuff
    pass

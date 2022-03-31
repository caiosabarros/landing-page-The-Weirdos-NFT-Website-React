import React, {useContext, createContext} from 'react'
import { LOGIN_TYPE } from '@toruslabs/torus-embed'

//import {WalletProviders} from '.'

//creating a type composed of such obj
type Config = {
    apiProvider: boolean
    //walletProviders: WalletProviders[]
    socialLogin: boolean
    socialLoginVerifiers: LOGIN_TYPE[]
    title: string
    networkType: 'testnet' | 'mainnet'
    blockchain: 'ethereum' | 'polygon'
    contractAddress: string
    currency: 'BRL' | 'USD'
    //GA is not here
    mainColor
}

//creating variable called config of type config
//To access config, we should do IConfigContext.config or {config}
interface IConfigContext {
    config: Config
}

//we create a CONTEXT of type IConfigContext with an empty obj of IConfigContext as the starting value 
const ConfigContext = createContext<IConfigContext>({} as IConfigContext)

//We create a function that returns the Config.Provider so that it 
//can be used whenever this functions is called instead of writing
//Config.Provider directly.
//This function takes two arguments because it gets the default argumetn children
//to make them appear somewhere and the config is taken from within the 
//page, I guess, to show it in the value propety.
export const ConfigProvider = ({children, config}: ) => {
    return (
        //value is the state that is passed to everyone whichs child.
        <ConfigContext.Provider value={IConfigContext.config}>
            {children}
        </ConfigContext.Provider>
    )
} 

//We create this function so that instead of the person
//calling useContext everytime, it is given to them through 
//a function. I need to know why about the validation.
export const useConfig = () => {
    const context = useContext(ConfigContext)
    //This is done for in case the following scenario occurs:
    // <MyComponent/>
    //   <ConfigProvider/>
    //     <Home/>
    //In the above scenario Home component has access to the global public
    //state config thorugh the ConfigProvider which uses the context config.
    //But if I call the function useConfig inside MyComponent, config will be undefined,
    //since it is passed only below, not above.
    if(context === undefined){
        throw new Error('useConfig should be used within a ConfigProvider')
    }
    return context
}
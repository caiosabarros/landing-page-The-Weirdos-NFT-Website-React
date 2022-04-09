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
    mainColor: string
}

//creating variable called config of type config
//To access config, we should do IConfigContext.config or {config}
interface IConfigContext {
    config: Config
}

//we create a CONTEXT of type IConfigContext with an empty obj of IConfigContext as the starting value 
// I couold have had a context of the type string, but I declared it to have the type of the interface 
//Iconfigcontext
const ConfigContext = createContext<IConfigContext>({} as IConfigContext)

//We create a function that returns the Config.Provider so that it 
//can be used whenever this functions is called instead of writing
//Config.Provider directly.
//This function takes two arguments because it gets the default argumetn children
//to make them appear somewhere and the config is taken from within the 
//page, I guess, to show it in the value propety.

type ConfigProviderProps = {
    children: React.ReactNode
    config: Config
  }

export const ConfigProvider = ({children, config}: ConfigProviderProps) => {
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

//To end up well, let's then understand piece by piece:'
/*
Provider is a component who is declared above the children which are able to useContext
useContext is used by the components inside the provider
createContext is the context created so that all the children under provider may useContext
The context itself is an obj state - for example- and this obj can be passed to anyone.
This obj is passed in the value in the provider of this obj
I can only import things that are inside the value props.
*/
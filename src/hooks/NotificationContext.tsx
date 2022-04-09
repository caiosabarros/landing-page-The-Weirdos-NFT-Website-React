import React, {createContext, useContext, useState} from 'react'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    useDisclosure,
    Box,
    Flex,
    Image,
    Text,
    Spinner
} from '@chakra-ui/react'

import {useConfig} from './ConfigProvider.tsx'
import { ERRORS, PAYMENT_STEPS, EMAIL_STATUS} from '../enums/index'

import badstatus from '../../public/bad-status.png'
import success from '../../public/success-status.png'
import erro from '../../public/error-status.png'

/*
A little bit of Typescript theory:

type declaration can be done through:
type Blockchain = {
    centralized: string,
    descentralized: string,
}

or

type Blockchain = (centralized: string, descentralized: string) => void

interface Blockchain {
    centralized: string,
    descentralized: string,
}

type and interface declarations are pretty similar,
but they differ in the sense that interfaces can be merged
if declared again.

For example if I declare blockchain interface again:
interface Blockchain {
    secure: boolean
}

The interface becomes:

interface Blockchain {
    centralized: string,
    descentralized: string,
    secure: boolean,
}

whereas the type declaration is static.
*/

type NotificationData = {
    borderColor?: string
    imageSrc?: string
    heading: string
    primaryText: string
    secondaryText: string
}

type Message = {
    primaryText?: string
    secondaryText?: string
}

type EmiteNotificationModalArgs = {
    type?: string
    message?: string
}

type EmitNotificationModal = (message: EmiteNotificationModalArgs) => void

/*A good thing to remember is that the context will send to
other components this entire obj. It is up to them though
how many of these objs they're gonna use.
*/
interface INotificationContext {
    //why on line below he declared emitNotificationModal as of type
    // EmitNotificationModal instead of EmiteNotificationModalArgs? 
    //Wouldnt the second approach be more direct?
    emitNotificationModal: EmitNotificationModal
    onCloseModificationModal: () => void
    isNotificationModalOpen: boolean
}

const NotificationContext = createContext<INotificationContext>({} as INotificationContext)

export const NotificationProvider = ({children}) => {

    // Once the messages come for the notificationData to be set, the notificationData
    //is used in the ModalCOmponent to provide the component with the data it needs so that 
    //the modal can be customized to the error
    const [notificationData, setNotificationData] = useState<NotificationData>({} as NotificationData)

    const {config} = useConfig()
    const {isOpen, onClose, onOpen} = useDisclosure()

    // I guess this message and type come from the code, that comes from the web3 provider.
    //I can use this function wherever I want if it is inside a component inside the provider
    //As I use this function, I need to give it its value and it will receive it and do the 
    //rest inside this provider. I can only import the things inside the value props of this provider.
    const emitNotificationModal: EmitNotificationModal = ({message, type}) => {
        //If it is closed, open the modal
        if (isOpen === false) onOpen()
        // set the data for the modal: the message and the type of the message coming in.
        setNotificationModalData({message, type})
    }

    const setNotificationModalData = ({message, type}: {type: string, message: string}) => {
        let data: NotificationData
        switch (type) {
            case ERRORS.WALLETS.WRONG_NETWORK.TYPE:
            case ERRORS.METAMASK.INSTALLATION.TYPE:
                data = {
                    imageSrc: badstatus.src,
                    heading: 'Humm..',
                    primaryText: message !== undefined && message.primaryText !== undefined ? message.primaryText : 'Parece que algo não esta correto', 
                    secondaryText: message !== undefined && message.secondaryText !== undefined ? message.secondaryText : 'Selecione a rede correta e tente novamente'
                }
                break
            case PAYMENT_STEPS.IN_PROGRESS:
                data = {
                    borderColor: config.mainColor,
                    heading: 'Processando..',
                    primaryText: message !== undefined && message.primaryText !== undefined ? message.primaryText : 'Só um momento...',
                    secondaryText: message !== undefined && message.secondaryText !== undefined ? message.secondaryText : 'Seu pedido está sendo processado'          
                }
                break
            case PAYMENT_STEPS.SUCCESS:
            case EMAIL_STATUS.SUCCESS:
                data = {
                    borderColor: '#8AC576',
                    imageSrc: success.src,
                    heading: 'Aee!',
                    primaryText: message !== undefined && message.primaryText !== undefined ? message.primaryText : 'Tudo indo conforme o planejado',
                    secondaryText: message !== undefined && message.secondaryText !== undefined ? message.secondaryText : 'Compra realizada com sucesso'           
                }
                break
            default:
                data = {
                    borderColor: '#E30000',
                    imageSrc: erro.src,
                    heading: 'Ops..',
                    primaryText: message !== undefined && message.primaryText !== undefined ? message.primaryText : 'Aguarde uns minutos e tente novamente',
                    secondaryText: message !== undefined && message.secondaryText !== undefined  ? message.secondaryText : 'Caso o erro persista entre em contato conosco.'          
                }
        }
        setNotificationModalData(data)
    }

    return(
        <NotificationContext.Provider value={{
            emitNotificationModal,
            onCloseModificationModal: onClose,
            isNotificationModalOpen: isOpen
        }}>
            {children}
        <ModalOverlay>
            <ModalContent borderRadius="15px" maxWidth="357px">
                <Box 
                  borderTop="6px solid"
                  borderColor={notificationData.borderColor === undefined ? "#FDC921" : notificationData.borderColor}
                  borderRadius="15px"                
                >
                    <Flex
                      w="100%"
                      m="0 auto"
                      flexDir="column"
                      justifyContent="center"
                      alignItems="center"
                      mb="20px"
                      mt="25px"                    
                    >
                        <Text mb="15px" fontSize="24px" textAlign="center">
                        {notificationData.heading}
                        </Text>
                        { notificationData.imageSrc !== undefined ?    
                        (
                        <Image
                          src={notificationData.imageSrc}
                          mt="30px"    
                        />
                         ) : (
                             <Spinner
                                thickness="6px"
                                speed="1s"
                                emptyColor="#DFDFDF"
                                color={config.mainColor}
                                w="100px"
                                h="100px"
                                mt="30px"
                             />
                         )  
                        }
                        <Text
                            fontSize="14px"
                            mt="45px"
                            color="#A19D9D"
                            fontWeight="bold"                        
                        >
                            {notificationData.primaryText}
                        </Text>
                        <Text textAlign="center" fontSize="14px" color="#454545" mt="10px">
                        {notificationData.secondaryText}
                        </Text>
                    </Flex>
                </Box>
            </ModalContent>
        </ModalOverlay>
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if(context === undefined){
        throw new Error(`useNotification must be used within a NotificationContext`)
    }
    return context
}

// <ModalOverlay>: quando abre-se o modal, faz o resto
//da pagina escurecer para foco ser no modal. Muito legal!
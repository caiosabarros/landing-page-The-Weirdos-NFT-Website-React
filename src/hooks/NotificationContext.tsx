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

import {useConfig} from '.'
import { ERRORS, PAYMENT_STEPS, EMAIL_STATUS} from '../enums'

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


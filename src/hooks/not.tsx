import React, { createContext, useContext, useState } from "react"
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
} from "@chakra-ui/react"

import { useConfig } from '.'
import { ERRORS, PAYMENT_STEPS, EMAIL_STATUS } from '../enums'

import badstatus from '../../public/bad-status.png'
import success from '../../public/success-status.png'
import erro from '../../public/error-status.png'

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

type EmitNotificationModalArgs = {
  type?: string
  message?: Message
}

type EmitNotificationModal = (message: EmitNotificationModalArgs) => void

interface INotificationContext {
  emitNotificationModal: EmitNotificationModal
  onCloseModificationModal: () => void
  isNotificationModalOpen: boolean
}

const NotificationContext = createContext<INotificationContext>({} as INotificationContext)

export const NotificationProvider = ({ children }) => {
  const [notificationData, setNotificationData] = useState<NotificationData>({} as NotificationData)

  const { config } = useConfig()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const emitNotificationModal: EmitNotificationModal = ({ message, type }) => {
    if (isOpen === false) onOpen()
    setNotificationModalData({message, type})
  }

  const setNotificationModalData = ({ message, type }: { type: string, message: Message }) => {
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
    setNotificationData(data)
  }

  return (
    <NotificationContext.Provider value={{
      emitNotificationModal,
      onCloseModificationModal: onClose,
      isNotificationModalOpen: isOpen
    }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius="15px" maxWidth="357px">
          <ModalBody p="0px" m="0px">
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
                {notificationData.imageSrc !== undefined ? (
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
                )}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error(`useNotification must be used within a NotificationContext`)
  }
  return context
}
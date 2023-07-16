import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

interface ShowVideoModalProps{
    isOpen:boolean;
    onClose:() => void;
    title:string;
    videoId:string;
}

export default function ShowVideoModal({isOpen, onClose, title, videoId}:ShowVideoModalProps){
    return(
        <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen} scrollBehavior={"inside"}>
            <ModalOverlay />
            <ModalContent maxW={'800px'} >
                <ModalHeader>
                    {title}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>{videoId}</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
import { Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, VStack, Text } from "@chakra-ui/react"

interface ReplyModalProps{
    isOpen:boolean;
    onClose:() => void;
    Propensity:string;
    data:any;
}

export default function ReplyModal({isOpen, onClose, Propensity, data}:ReplyModalProps){
    return(
        <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen} scrollBehavior={"inside"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {Propensity} Reply
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        {
                            data.map((test:any)=>(
                                <Text>{test.author}</Text>
                            ))
                        }
                    </VStack>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
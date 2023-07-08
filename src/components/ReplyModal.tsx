import { Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, VStack, Text, HStack, Tag, TagLabel, Box, Flex } from "@chakra-ui/react"
import { AiFillYoutube } from "react-icons/ai";

interface ReplyModalProps{
    isOpen:boolean;
    onClose:() => void;
    Propensity:string;
    data:any;
}

export default function ReplyModal({isOpen, onClose, Propensity, data}:ReplyModalProps){
    let tagColor = ''
    if(Propensity==='Positive'){
        tagColor='blue'
    } else if(Propensity==='Nagative'){
        tagColor='red'
    } else{
        tagColor='gray'
    }

    return(
        <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen} scrollBehavior={"inside"} >
            <ModalOverlay />
            <ModalContent maxW={'800px'} >
                <ModalHeader>
                    {Propensity} Reply
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <HStack display={'flex'} textAlign={'center'}>
                            <Box w={'15vh'} bg={'tomato'} color={'white'}>
                                Author
                            </Box>
                            <Box w={'39vh'} bg={'blue.400'} color={'white'}>
                                Reply
                            </Box>
                            <Box w={'15vh'} bg={'teal.400'} color={'white'}>
                                Score
                            </Box>
                        </HStack>
                        {
                            data.map((test:any)=>(
                                <HStack display={'flex'} textAlign={'center'}>
                                    <Box w={'15vh'}>
                                        <Text as={'b'}>{test.author}</Text>
                                    </Box>
                                    <Box w={'39vh'}>
                                        <Text>{test.reply}</Text>
                                    </Box>
                                    <Box w={'15vh'} as="b">
                                        <Text>{test.score}점</Text>
                                    </Box>
                                </HStack>
                            ))
                        }
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Flex mr={'550px'}>
                        <Box color="red" >
                            <AiFillYoutube size={"30"} />
                        </Box>
                        <Text as={'b'} fontSize={'lg'}>YoutuBOT</Text>
                    </Flex>
                    <Tag size={'lg'} colorScheme={tagColor} borderRadius={'full'}>
                        <TagLabel>
                            {Propensity}
                        </TagLabel>
                    </Tag>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
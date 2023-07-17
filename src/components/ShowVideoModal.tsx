import { Box, Divider, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { ISearchLogPostError, ISearchLogPostSuccess, ISearchLogPostVariables, searchLogPost } from "../api";
import { useState, useEffect } from "react";

interface ShowVideoModalProps{
    isOpen:boolean;
    onClose:() => void;
    title:string;
    videoId:string;
}

let positiveScore:any=[]
let nagativeScore:any=[]
let neutralScore:any=[]

export default function ShowVideoModal({isOpen, onClose, title, videoId}:ShowVideoModalProps){
    const [cnt, setCnt] = useState(0);

    const watchVideoLink = `https://www.youtube.com/embed/${videoId}`
    const search_link = `https://www.youtube.com/watch?v=${videoId}`

    const [ getReply, setGetReply ] = useState<any>(false);
    const [ getReplyLoading, setGetReplyLoading ] = useState<Boolean>(false);
    const [ getErrorLoading, setGetErrorLoading ] = useState<Boolean>(false);
    const [ getError, setGetError ] = useState<any>(false);

    const mutation = useMutation<ISearchLogPostSuccess, ISearchLogPostError, ISearchLogPostVariables>(searchLogPost, {
        onSuccess:(data) => {
            setGetReply(data)
        },
        onError:(error) => {
            setGetError(error.response.data)
        }
    });

    useEffect(() => {
        if (cnt > 1) return;
        mutation.mutate({search_link})
    }, [cnt])

    useEffect(() => {
        if (getError){
            setGetErrorLoading(true)
            return
        } else if(Object.keys(getReply)[0] == 'status'){
            setGetErrorLoading(true)
            return
        } else if(Object.keys(getReply).length === 0){
            return
        }

        Object.entries(getReply).map((data:any) => {
            const author = data[0]
            const reply = Object.keys(data[1])
            const score:number = Object.values(data[1])[0] as number

            if(score > 3){
                positiveScore.push({'author':author, 'reply':reply, 'score':score})
            }else if(score <3){
                nagativeScore.push({'author':author, 'reply':reply, 'score':score})
            }else{
                neutralScore.push({'author':author, 'reply':reply, 'score':score})
            }
        })

        setGetReplyLoading(true)
    }, [getReply, getError])

    const timeout = setTimeout(() => setCnt(cnt + 1), 1000);
    clearTimeout(timeout);

    return(
        <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen} scrollBehavior={"inside"}>
            <ModalOverlay />
            <ModalContent maxW={'800px'} >
                <ModalHeader>
                    {title}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Box display={'flex'} justifyContent={'center'} mb={5}>
                            <Box
                                as='iframe'
                                src={watchVideoLink}
                                width='50%'
                                sx={{
                                    aspectRatio: '16/9'
                                }}
                            />
                        </Box>
                        {
                            getErrorLoading ? (
                                <VStack display={'flex'} textAlign={'center'}>
                                    <Divider />
                                    <Text color={'blackAlpha.600'} as={'b'} fontSize={'lg'}>
                                        GPT가 문제를 일으켰습니다. ㅠㅠ 댓글이 없거나 점수산정을 하지 못하고 있습니다.
                                    </Text>
                                </VStack>
                            ) : (
                                getReplyLoading ? (
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
                                    </VStack>
                                ) : null
                            )
                        }
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
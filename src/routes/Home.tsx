import { Button, Text, Heading, VStack, HStack, Input, Box, InputGroup, InputLeftElement, useToast, useDisclosure } from "@chakra-ui/react";
import { FaLink, FaFaceGrinBeamSweat, FaFaceSadTear, FaFaceLaughSquint, FaArrowLeftLong } from "react-icons/fa6";
import { AiFillYoutube } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ISearchLogPostError, ISearchLogPostSuccess, ISearchLogPostVariables, searchLogPost } from "../api";
import { useState, useEffect } from "react";

import ReplyModal from "../components/ReplyModal";
import ReplyButton from "../components/ReplyButton";
import { Link } from "react-router-dom";

let positiveScore:any=[]
let nagativeScore:any=[]
let neutralScore:any=[]

export default function Home(){
    const { register, watch, handleSubmit, formState:{errors} } = useForm<ISearchLogPostVariables>();

    const [ getReply, setGetReply ] = useState<any>(false);
    const [ getReplyLoading, setGetReplyLoading ] = useState<Boolean>(false);
    const [ getVideoLink, setGetVideoLink ] = useState<string>('');
    const [ getErrorLoading, setGetErrorLoading ] = useState<Boolean>(false);
    const [ getError, setGetError ] = useState<any>(false);

    const toast = useToast();
    const mutation = useMutation<ISearchLogPostSuccess, ISearchLogPostError, ISearchLogPostVariables>(searchLogPost, {
        onMutate:() => {
            toast({
                title:"Loading",
                status:"loading",
            });
        },
        onSuccess:(data) => {
            toast({
                title:"Success",
                status:"success",
            });
            setGetReply(data)
        },
        onError:(error) => {
            toast({
                title:"Error",
                status:"error"
            })
            setGetError(error.response.data)
        }
    });

    const onSubmit = async ({search_link}:ISearchLogPostVariables) => {
        const generateVideoLink = search_link.replace('watch?v=','embed/')
        setGetVideoLink(generateVideoLink)
        mutation.mutate({search_link})
    }

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
    }, [getReply])

    useEffect(()=>{

    }, [positiveScore])

    return(
        <Box>
            {
                !getReply ? (
                    <VStack justifyContent={"center"} minH="70vh">
                        <HStack mb={10}>
                            <Box color="red" >
                                <AiFillYoutube size={"100"} />
                            </Box>
                            <Text as={'b'} fontSize={'5xl'}>YoutuBOT</Text>
                        </HStack>
                        <HStack as="form" onSubmit={handleSubmit(onSubmit)}>
                            <Box>
                                <InputGroup>
                                    <InputLeftElement children={
                                        <Box color="gray.500">
                                            <FaLink/>
                                        </Box>
                                    }/>
                                    <Input w={'500px'} isInvalid={Boolean(errors.search_link?.message)} {...register("search_link",{
                                            required:"Please write a Youtube video link",
                                        })} placeholder="Youtube Link" />
                                </InputGroup>
                            </Box>
                            <Button isLoading={mutation.isLoading} type="submit" colorScheme="red">Submit</Button>
                        </HStack>
                    </VStack>
                ) : (
                    <VStack justifyContent={"center"} minH="20vh">
                        <HStack mb={5}>
                            <Box color="red" >
                                <AiFillYoutube size={"100"} />
                            </Box>
                            <Text as={'b'} fontSize={'5xl'}>YoutuBOT</Text>
                        </HStack>
                        <Box>
                            <Box display={'flex'} justifyContent={'center'}>
                                <Box
                                    as='iframe'
                                    src={getVideoLink}
                                    width='50%'
                                    sx={{
                                        aspectRatio: '16/9'
                                    }}
                                />
                            </Box>
                            {
                                getErrorLoading ? (
                                    <Text>이 영상에 대한 댓글이 없거나 GPT가 인식을 하지 못합니다.</Text>
                                ) : (
                                        getReplyLoading?(
                                            <VStack mt={10} display={'flex'} justifyContent={'center'}>
                                                <Box display={'flex'} textAlign={'center'}>
                                                    <Text as={'b'} fontSize={'2xl'}>
                                                        Click the button to read the comments
                                                    </Text>
                                                </Box>
                                                <HStack>
                                                    <VStack display={'flex'} textAlign={'center'}>
                                                        {
                                                                <ReplyButton color="blue.300" Propensity={"Positive"} Data={positiveScore} ButtonIcon={<FaFaceLaughSquint />} />
                                                        }
                                                    </VStack>
                                                    <VStack display={'flex'} textAlign={'center'}>
                                                        {
                                                                <ReplyButton color="whiteAlpha" Propensity={"Neutral"} Data={neutralScore} ButtonIcon={<FaFaceGrinBeamSweat />} />
                                                        }
                                                    </VStack>
                                                    <VStack display={'flex'} textAlign={'center'}>
                                                        {
                                                                <ReplyButton color="red.300" Propensity={"Nagative"} Data={nagativeScore} ButtonIcon={<FaFaceSadTear />} />
                                                        }
                                                    </VStack>
                                                </HStack>
        
                                                <Button leftIcon={<FaArrowLeftLong />} colorScheme="red" mt={10} onClick={() => {
                                                    positiveScore.splice(0, positiveScore.length)
                                                    nagativeScore.splice(0, nagativeScore.length)
                                                    neutralScore.splice(0, neutralScore.length)
                                                    setGetReply(false)
                                                    setGetReplyLoading(false)
                                                    setGetVideoLink('')
                                                }}>
                                                    Go to Home
                                                </Button>
                                            </VStack>
                                        ) : null
                                )
                            }
                        </Box>
                    </VStack>
                )
            }
        </Box>
    )
}
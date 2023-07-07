import { Button, Text, Heading, VStack, HStack, Input, Box, InputGroup, InputLeftElement, useToast, useDisclosure } from "@chakra-ui/react";
import { FaLink, FaFaceGrinBeamSweat, FaFaceSadTear, FaFaceLaughSquint } from "react-icons/fa6";
import { AiFillYoutube } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ISearchLogPostError, ISearchLogPostSuccess, ISearchLogPostVariables, searchLogPost } from "../api";
import { useState, useEffect } from "react";
import ReplyModal from "../components/ReplyModal";
import ReplyButton from "../components/ReplyButton";

const positiveScore:any=[]
const nagativeScore:any=[]
const neutralScore:any=[]

export default function Home(){
    const { register, watch, handleSubmit, formState:{errors} } = useForm<ISearchLogPostVariables>();

    const { isOpen:isReplyOpen, onClose:onReplyClose, onOpen:onReplyOpen } = useDisclosure();

    const [ getReply, setGetReply ] = useState<any>(false);
    const [ getPositiveReply, setGetPositiveReply ] = useState<any>(false);
    const [ getNagativeReply, setGetNagativeReply ] = useState<any>(false);
    const [ getNeutralReply, setGetNeutralReply ] = useState<any>(false);
    const [ getReplyLoading, setGetReplyLoading ] = useState<Boolean>(false);
    const [ getVideoLink, setGetVideoLink ] = useState<string>('');
    const [ test, settest ] = useState<any>();

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
        }
    });

    const onSubmit = async ({search_link}:ISearchLogPostVariables) => {
        const generateVideoLink = search_link.replace('watch?v=','embed/')
        setGetVideoLink(generateVideoLink)
        mutation.mutate({search_link})
    }

    useEffect(() => {
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

    console.log(positiveScore)

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
                                getReplyLoading?(
                                    <VStack mt={10}>
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
                                    </VStack>
                                ):null
                            }
                        </Box>
                    </VStack>
                )
            }
        </Box>
    )
}
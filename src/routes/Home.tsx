import { Button, Text, Heading, VStack, HStack, Input, Box, InputGroup, InputLeftElement, useToast } from "@chakra-ui/react";
import { FaLink } from "react-icons/fa6";
import { AiFillYoutube } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ISearchLogPostError, ISearchLogPostSuccess, ISearchLogPostVariables, searchLogPost } from "../api";
import { useState } from "react";

export default function Home(){
    const { register, watch, handleSubmit, formState:{errors} } = useForm<ISearchLogPostVariables>();

    const [ getReply, setGetReply ] = useState<any>(false);

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
        // console.log(search_link)
        mutation.mutate({search_link})
    }

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
                        <HStack mb={10}>
                            <Box color="red" >
                                <AiFillYoutube size={"100"} />
                            </Box>
                            <Text as={'b'} fontSize={'5xl'}>YoutuBOT</Text>
                        </HStack>
                        <Box>
                            {
                                Object.values(getReply).map((data:any) => (
                                    <Text>{data.reply}</Text>
                                ))
                            }
                        </Box>
                        {/* {
                            getReply.map((replyData:any) => {
                                console.log(replyData)
                            })
                        } */}
                    </VStack>
                )
            }
        </Box>
    )
}
import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { ISearchLogPostError, ISearchLogPostSuccess, ISearchLogPostVariables, searchLogPost } from "../api";
import { useState, useEffect } from "react";
import ShowVideoModal from "./ShowVideoModal";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface VideoCardProps{
    video:any
}

let positiveScoreInModal:any=[]
let nagativeScoreInModal:any=[]
let neutralScoreInModal:any=[]

export default function VideoCard({video}:VideoCardProps){
    const { isOpen:isVideoModalOpen, onClose:onVideoModalClose, onOpen:onVideoModalOpen } = useDisclosure();

    return(
        <Card direction={{ base: 'column', sm: 'row' }} h={'20vh'} w={'80vh'} overflow={'hidden'}>
            <Image objectFit={'cover'} maxW={{ base: '100%', sm: '215px' }} src={video.snippet.thumbnails.high.url} alt="Thumbnail" />
            <Stack>
                <CardBody>
                    <Heading size={'md'}>{video.snippet.title}</Heading>
                    <Text py={2}>
                        {video.snippet.description}
                    </Text>
                </CardBody>
                <CardFooter>
                    <Button variant='solid' colorScheme='red' onClick={onVideoModalOpen}>
                        Show video
                    </Button>
                    <ShowVideoModal isOpen={isVideoModalOpen} onClose={onVideoModalClose} title={video.snippet.title} videoId={video.id.videoId} />
                </CardFooter>
            </Stack>
        </Card>
    )
}
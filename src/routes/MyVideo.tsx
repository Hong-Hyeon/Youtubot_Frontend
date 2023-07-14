import { useParams } from "react-router-dom";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IAuthenticatePostError, IAuthenticatePostSuccess, IAuthenticatePostVariables, googleAuthenticatePost } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MyVideo(){
    const { accessToken } = useParams();
    const [ getVideoData, setGetVideoData ] = useState<any>(false);
    const [ getToken, setGetToken ] = useState<any>(false);

    if(!getToken){
        setGetToken(accessToken)
    }

    useEffect(() => {
        if (getToken) {
            axios
                .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&maxResults=20&key=AIzaSyCQlLbuD2m63JCGNBfM7k2jFneaaxJN5vY`, {
                    headers: {
                        Authorization: `Bearer ${getToken}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    // setProfile(res.data);
                    // setGoogleAccessToken(getGoogleAccount.access_token);
                    const channelId = res.data['items'][0].id
                    axios
                    .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&key=AIzaSyCQlLbuD2m63JCGNBfM7k2jFneaaxJN5vY`)
                    .then((res) => {
                        setGetVideoData(res.data.items)
                    }).catch((err) => console.log(err))
                })
                .catch((err) => console.log(err));
        }
    }, [getToken])

    console.log(getVideoData)
    return(
        <HStack>
            
        </HStack>
    )
}
import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IAuthenticatePostError, IAuthenticatePostSuccess, IAuthenticatePostVariables, googleAuthenticatePost } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function MyVideo(){
    const { accessToken } = useParams();
    const accessTokenString = accessToken as string
    const [ getVideoData, setGetVideoData ] = useState<any>(false);

    console.log(accessToken)

    const mutation = useMutation<IAuthenticatePostSuccess, IAuthenticatePostError, IAuthenticatePostVariables>(googleAuthenticatePost, {
        onSuccess:(data) => {
            setGetVideoData(data)
        },
        onError:(error) => {
            console.log(error)
        }
    });
    useEffect(() => {
        mutation.mutate({access_token:accessTokenString})
    }, [accessToken])

    useEffect(() => {
        console.log(getVideoData)
    }, [getVideoData])

    return(
        <Text>{accessToken}</Text>
    )
}
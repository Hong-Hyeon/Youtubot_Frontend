import { Stack, Box, Text, HStack, LightMode, useColorMode, useColorModeValue, IconButton, Button, useToast, Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { AiFillYoutube } from "react-icons/ai";
import { FaMoon, FaSun, FaAngleDown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useState, useEffect } from "react";

import {useGoogleLogin, googleLogout} from "@react-oauth/google"

export default function Header(){
    const { toggleColorMode } = useColorMode();
    const Icon = useColorModeValue(FaMoon, FaSun)
    const toast = useToast();

    const [ getGoogleAccount, setGetGoogleAccount ] = useState<any>([]);
    const [ profile, setProfile ] = useState<any>([]);
    const [ googleAccessToken, setGoogleAccessToken ] = useState<any>();

    const GoogleButtonOnClick = useGoogleLogin({
        onSuccess: tokenResponse => {
            setGetGoogleAccount(tokenResponse)
        },
        onError: (error) => {
            console.log(error);
        },
    });

    useEffect(() => {
        if (getGoogleAccount) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${getGoogleAccount.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${getGoogleAccount.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    setGoogleAccessToken(getGoogleAccount.access_token);
                })
                .catch((err) => console.log(err));
        }
    }, [getGoogleAccount])

    const logOut = () => {
        googleLogout();
        setProfile(null);
        setGoogleAccessToken(null);
    };

    return(
        <Stack
            justifyContent={"space-between"}
            alignItems="center"
            py={1}
            px={20}
            direction={{
                sm:"column",
                md:"row",
            }}
            spacing={{
                sm: 3,
                md: 0,
            }}
            borderBottomWidth={1}>
            <HStack>
                <Box color="red" >
                    <Link to={"/"}>
                        <AiFillYoutube size={"50"} />
                    </Link>
                </Box>
                <Text as={'b'} fontSize={'2xl'}>YoutuBOT</Text>
            </HStack>
            <HStack>
                <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={<Icon/>} />
                {
                    !profile ? (
                        <Button leftIcon={<FcGoogle size={30} />} colorScheme="facebook" variant={"outline"} onClick={() => GoogleButtonOnClick()}>
                            Continue with Google
                        </Button>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar name={profile?.name} src={profile?.picture} size={"sm"} />
                            </MenuButton>
                            <MenuList>
                                <Link to={`/myvideo/${googleAccessToken}`}>
                                    <MenuItem>
                                        My Video
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={logOut}>
                                    LogOut
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )
                }
            </HStack>
        </Stack>
    )
}
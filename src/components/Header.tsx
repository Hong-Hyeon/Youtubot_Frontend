import { Stack, Box, Text, HStack, LightMode, useColorMode, useColorModeValue, IconButton, Button, useToast, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { AiFillYoutube } from "react-icons/ai";
import { FaMoon, FaSun, FaAngleDown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from 'jwt-decode';
import { useState } from "react";

import {GoogleLogin, GoogleOAuthProvider, useGoogleLogin} from "@react-oauth/google"

export default function Header(){
    const { toggleColorMode } = useColorMode();
    const Icon = useColorModeValue(FaMoon, FaSun)
    const toast = useToast();
    
    // const clientId = '943691058272-2gap6eic690flr5l1li8rq2gmrvglqvs.apps.googleusercontent.com'

    // const [ getGoogleAccount, setGetGoogleAccount ] = useState<any>(false);

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
                <Button leftIcon={<FcGoogle size={30} />} colorScheme="facebook" variant={"outline"} onClick={() => {
                    toast({
                        title:"Comming soon",
                        status:"info",
                        isClosable: true,
                    });
                }}>Continue with Google</Button>
                {/* <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin onSuccess={(res) => {
                        setGetGoogleAccount(!getGoogleAccount)

                        console.log(res)
                        let userObject = jwt_decode(res.credential as string);
                        console.log(userObject)
                    }} />
                </GoogleOAuthProvider> */}
                {/* {
                    getGoogleAccount ? (
                        <Menu>
                            <MenuButton>
                                <IconButton colorScheme="red" rounded={'xl'} aria-label="Google Menu" icon={<FaAngleDown />} />
                            </MenuButton>
                            <MenuList>
                                <Link to={'/myvideo/'}>
                                    <MenuItem>
                                        My Video
                                    </MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                    ) : null
                } */}
            </HStack>
        </Stack>
    )
}
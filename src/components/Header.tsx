import { Stack, Box, Text, HStack, LightMode, useColorMode, useColorModeValue, IconButton, Button, useToast } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { AiFillYoutube } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Header(){
    const { toggleColorMode } = useColorMode();
    const Icon = useColorModeValue(FaMoon, FaSun)
    const toast = useToast();

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
            </HStack>
        </Stack>
    )
}
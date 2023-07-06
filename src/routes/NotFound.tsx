import { Button, Text, Heading, VStack } from "@chakra-ui/react";
import {Link} from "react-router-dom";
import { AiFillYoutube } from "react-icons/ai";

export default function NotFound(){
    return(
    <VStack bg={"blackAlpha.100"} justifyContent={"center"} minH="100vh">
        <Heading>Page not found.</Heading>
        <Text>It seems that you're lost.</Text>
        <Link to={"/"}>
            <Button leftIcon={<AiFillYoutube />} colorScheme={"red"} variant={"solid"}>
                Go YoutuBOT &rarr;
            </Button>
        </Link>
    </VStack>
    )
}
import { Button, Text, Heading, VStack } from "@chakra-ui/react";

export default function NotFound(){
    return(
    <VStack bg={"blackAlpha.100"} justifyContent={"center"} minH="100vh">
        <Heading>Page not found.</Heading>
        <Text>It seems that you're lost.</Text>
        {/* <Link to={"/"}>
            <Button colorScheme={"teal"} variant={"solid"}>
                Go home &rarr;
            </Button>
        </Link> */}
    </VStack>
    )
}
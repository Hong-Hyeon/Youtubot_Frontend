import { Box,Button,useDisclosure } from "@chakra-ui/react"
import ReplyModal from "./ReplyModal";

interface ReplyButtonProps{
    Data:any
    ButtonIcon:any
    Propensity:string
    color:string
}

export default function ReplyButton({Data, ButtonIcon, Propensity, color}:ReplyButtonProps){
    const { isOpen:isReplyOpen, onClose:onReplyClose, onOpen:onReplyOpen } = useDisclosure();

    return(
        <Box>
            <Button leftIcon={ButtonIcon} w={'40vh'} bg={color} borderWidth={1} onClick={onReplyOpen}>
                {Propensity}
            </Button>
            <ReplyModal isOpen={isReplyOpen} onClose={onReplyClose} Propensity={Propensity} data={Data}/>
        </Box>
    )
}
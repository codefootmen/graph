import React from 'react';
import { Modal, ModalBackground, ModalContent, ModalClose, Box } from 'bloomer';
const modal = (props) => {
    return (
        <Modal isActive={props.active}>
            <ModalBackground />
            <ModalContent>
                <Box>
                    {props.message}
                </Box>
            </ModalContent>
            <ModalClose onClick={props.close} />
        </Modal>
    )
}

export default modal;
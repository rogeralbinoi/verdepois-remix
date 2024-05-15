import { Form } from "@remix-run/react";
import { IconButton } from '@chakra-ui/react'
import { PostLink } from "~/types/post_link";
import { DeleteIcon } from '@chakra-ui/icons';

type DeleteCardButtonProps = {
    id: string;
}

export default function DeleteCardButton({ id }: DeleteCardButtonProps) {
    return (
        <Form method="DELETE">
            <IconButton type="submit" name="id" value={id} aria-label='Delete Card' size="sm" icon={<DeleteIcon />} />
        </Form>
    );
}

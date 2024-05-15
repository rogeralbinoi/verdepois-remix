import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, HStack, Button, Input, Tag, IconButton, Text, Show, Hide } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import slug from "url-slug";
import { Category } from '~/types/post_link';

type categoriesInputProps = { name: string, defaultValue: Category[] | null };

function CategoriesInput({ name, defaultValue }: categoriesInputProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [value, setValue] = useState<string>("");
    const inputFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (defaultValue) {
            setCategories(defaultValue);
        }
    }, [defaultValue]);

    const addCategory = useCallback(() => {
        if (!value) return;
        setCategories((_categories) => {
            return _categories.concat({
                name: slug(value),
                value: value
            });
        });
        setValue("");
        inputFieldRef?.current?.focus();
    }, [setCategories, value, setValue]);

    const removeCategory = useCallback((name: string) => {
        setCategories(_categories => {
            return _categories.filter(item => item.name !== name)
        })
    }, [])

    const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setValue(e?.currentTarget?.value);
    }, [setValue]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addCategory();
        }
    };

    return (
        <Box>
            <HStack>
                <Input
                    ref={inputFieldRef}
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Category" />
                <Hide below="md">
                    <Button size="sm" colorScheme="secondary" color="black" leftIcon={<AddIcon />} onClick={() => addCategory()}>
                        Adicionar
                    </Button>
                </Hide>
                <Show below="md">
                    <IconButton aria-label="Adicionar" size="sm" colorScheme="secondary" color="black" icon={<AddIcon />} onClick={() => addCategory()} />
                </Show>
            </HStack>
            <Box mt="5" mb="5" h="100px">
                {categories.map(item => {
                    return (
                        <Tag key={item.name} m="1" color="white" bg="primary.500">
                            <IconButton
                                colorScheme='primary'
                                onClick={() => removeCategory(item.name)}
                                size="sm" m="0" aria-label="Remover Categoria" icon={<DeleteIcon />} />
                            <Text as="span">{item.value}</Text>
                        </Tag>
                    );
                })}
            </Box>
            <Input name={name} type="hidden" value={JSON.stringify(categories)} />
        </Box>
    )
}
export default CategoriesInput;
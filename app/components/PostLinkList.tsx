import { Grid, GridItem } from '@chakra-ui/react'
import { PostLink } from "~/types/post_link";
import PostLinkCard from "~/components/PostLinkCard";

type PostLinkListProps = {
    postLinks: PostLink[]
}

export default function Index({ postLinks }: PostLinkListProps) {
  return (
      <Grid templateColumns={
        {
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          base: '1fr'
        }
      } gap={6}>
        {
          postLinks?.map(item => (
            <GridItem w='100%' maxW="300px" key={item.id}>
              <PostLinkCard postLink={item}></PostLinkCard>
            </GridItem>
          ))
        }
      </Grid>
  );
}

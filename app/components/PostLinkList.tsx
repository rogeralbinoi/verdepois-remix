import { Grid, GridItem } from '@chakra-ui/react'
import { PostLink } from "~/types/post_link";
import PostLinkCard from "~/components/PostLinkCard";

type PostLinkListProps = {
    postLinks: PostLink[]
}

export default function PostLinkList({ postLinks }: PostLinkListProps) {
  return (
      <Grid 
      templateColumns={
       "repeat(auto-fit, minmax(260px, 260px))" 
      } gap={6}>
        {
          postLinks?.map(item => (
            <GridItem maxW="260px" key={item.id}>
              <PostLinkCard postLink={item}></PostLinkCard>
            </GridItem>
          ))
        }
      </Grid>
  );
}

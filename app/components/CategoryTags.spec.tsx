import { renderWithRouter, screen } from 'test/test-util'
import PostLinkCard from './PostLinkCard'
import postLinks from '../../mocks/db';

it('loads and displays greeting', async () => {

    renderWithRouter(<PostLinkCard postLink={postLinks[0]} />)

    await screen.findByRole('heading')

    expect(screen.getByRole('heading')).toHaveTextContent('Ganhando performance com Apollo APQ - Automatic Persisted Queries')
})

import Video from '../Components/Video';
import Offers from '../Components/Offers';

export default function Home() {
    return(
        <>
            <Offers />
            <h2 className='text-purple mt-5 mb-3'>Where opportunity creates success</h2>
            <p>Every student at the University of Central Lancashire is automatically a member of the Students' Union. We are here to make life better for students - inspiring you to succeed and achieve your goals.</p>
            <p>Everything you need to know about UCLan Students' Union. Your membership starts here.</p>
            <Video heading='Together' type='embed' src='./videos/UCLanOpenDays.mp4' />
            <Video heading='Join our global community' type='link' src='https://www.youtube.com/embed/i2CRunZv9CU' />
        </>
    );
}
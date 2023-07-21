import { useNavigate } from 'react-router-dom'
import { IoIosArrowDropleft } from 'react-icons/io'
import '../../index.css';

const PrevPageBtn = () => {

    const navigate = useNavigate();
    const prevPage = () => {
        navigate(-1);
    } 

    return (<IoIosArrowDropleft onClick={prevPage} className='arrow-prev-page'/>)
}

export default PrevPageBtn;
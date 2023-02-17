import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/Supporter.module.css'

const Supporters = () => {
  const router = useRouter();
  const {slug} = router.query;
  return (
    // <div>{slug}</div>
    <>
   <div className='d-flex flex-column justify-content-center align-items-center'>
   <div className='fs-1 mt-3 text-light fw-bold'>Supporters</div>
    <div className={`${styles.table} mb-3 mt-3`}>
        <div className='row'>
            <div className='col-8 d-flex flex-column justify-content-center align-items-center'>
                <div className={`${styles.name}`}>Abhijeet</div>
                <div className={`${styles.name}`}>Subham</div>
                <div className={`${styles.name}`}>Dev Ashreet</div>
                <div className={`${styles.name}`}> Paras Singh</div>
                <div className={`${styles.name}`}>Rahul Singh</div>
                <div className={`${styles.name}`}>Manoj Pandey</div>
                <div className={`${styles.name}`}>Sania Mirza</div>
                <div className={`${styles.name}`}>Salman Khan</div>
                <div className={`${styles.name}`}>Raj Kumar</div>
                <div className={`${styles.name}`}>Disha Karmakar</div>
            </div>
            <div className='col-4 d-flex flex-column justify-content-center align-items-center'>
            <div className='name'></div>
                <div className={`${styles.amount}`}>₹1000</div>
                <div className={`${styles.amount}`}>₹4000</div>
                <div className={`${styles.amount}`}>₹3000</div>
                <div className={`${styles.amount}`}>₹1000</div>
                <div className={`${styles.amount}`}>₹2000</div>
                <div className={`${styles.amount}`}>₹8000</div>
                <div className={`${styles.amount}`}>₹7000</div>
                <div className={`${styles.amount}`}>₹1000</div>
                <div className={`${styles.amount}`}>₹9000</div>
            </div>
        </div>
    </div>
   </div>
    
    </>
  )
}

export default Supporters
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from "../styles/Profile.module.css"
import { AiFillHeart } from "react-icons/ai"
import Link from 'next/link';
import axios from 'axios';

const profile = ({userDetails}) => {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState({
        iat: "",
        email: "",
        username: ""
    });
    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }
    const changeBackground = () => {
        const crypto = require('crypto').randomBytes(3).toString('hex');
        document.documentElement.style.setProperty('--backColor', `#${crypto}b0`);
    }

    const getsignupDetails = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/hackathon/home', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const obj1 = response.data.data;
        setLoggedIn(obj1);

    }
    useEffect(() => {
        getsignupDetails();
        changeBackground();
    }, [router.query]);
    
    return (
        <>
            <div className={`row  ${styles.boddy} py-5`}>
                <div className={`col-lg-3 col-md-4 col-12 mb-3`}>
                    <div className={`${styles.acclsidecont} p-2 mx-auto`}>
                        <div className="mx-3 my-5 d-flex justify-content-center">
                            <img src="/dashimg.png" className={`${styles.accig} img-thumbnail`} alt="..." />
                        </div>
                        <div className={`${styles.acclside} mb-2`}>
                            <div className="text-center d-flex align-items-center justify-content-center p-2"><Link className={styles.profilelink} href="/profile">Dashboard</Link></div>
                        </div>
                        <div className={`${styles.acclside}  mb-2`}>
                            <div className="text-center d-flex align-items-center justify-content-center p-2"><Link className={styles.profilelink} href="/accountdetails">Account Details</Link></div>
                        </div>
                        <div className={`${styles.acclside} mb-2`}>
                            <div className="text-center d-flex align-items-center justify-content-center p-2" ><Link className={styles.profilelink} href="/ngodetails">N.G.O Details</Link></div>
                        </div>
                        <div className={`fixed-bottom mb-5`}>
                            <div className="text-center d-flex align-items-center justify-content-center p-2" onClick={logout}><button type="submit" className={`btn ${styles.btnl} px-2 `}>Logout</button></div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.leftborder} col-lg-9 col-md-8`}>
                    <>
                        <div className={`${styles.profilespace}`}></div>
                        <div className={`${styles.picborder}`}></div>
                        <div className={` d-flex flex-column align-items-left justify-content-left`}>
                            <img src="/dashimg.png" className={`img-thumbnail ${styles.accig1}`} alt="..." />
                        </div>
                        <div className="row">
                            <div className={`${styles.data} col-lg-7 col-md-12 col-12`}>
                                <div className={`${styles.title} fs-1`}>
                                    {userDetails ? userDetails.username : loggedIn.username}
                                </div>
                                <div className="fs-4">
                                    <span>{userDetails ? userDetails.occupation : ""}</span>
                                    <span className='mx-3'>{userDetails ? userDetails.age : ""}</span>
                                </div>
                                <div className="fs-5">
                                    <span>{userDetails ? userDetails.about : ""}</span>
                                </div>
                            </div>
                            <div className={`${styles.ngobox} col-lg-5 col-md-12 col-12`}>
                                {loggedIn.hasNGO ? <>
                                    <div className="d-flex">
                                        <div className={`m-3 ${styles.ngoimg} d-flex justify-content-center align-items-center`}>
                                            <img className={` img-thumbnail card-img-top`} src="/logo.png" alt="Card image cap" />
                                        </div>
                                        <div className="fs-3 d-flex justify-content-center align-items-center">
                                            {userDetails ? userDetails.NGOname : ""}
                                        </div>
                                    </div>
                                </>
                                    :
                                    <><div className={'d-flex justify-content-end m-0 p-0'}>
                                        <div className={`${styles.plusbutton}`}>
                                            <button type="submit" className={`${styles.plus} h-100 w-100 btn fs-2`}>+</button>
                                        </div>
                                    </div>
                                        <div className={`${styles.addngo} d-flex justify-content-center align-items-center`}>
                                            <div className=" fs-2"> Add Your N.G.O.</div>
                                        </div>
                                    </>}


                            </div>
                            <div className={`${styles.donatebox} col-12`}>
                                <div className={`${styles.cornerheart}`}><AiFillHeart></AiFillHeart></div>
                                <div className='fs-1 text-black mb-5  d-flex justify-content-center align-items-center fw-bold mt-5'>Your Donations</div>

                                <div className='d-flex justify-content-center align-items-center row'>
                                    <div className={`${styles.donatecard} card m-3 mb-5 col-12`} >
                                        <img className="card-img-top" src="/finalogo.png" alt="Card image cap" />
                                        <div className={`${styles.donatecardbody} card-body`}>
                                            <div className="card-text mb-2">Some quick example text to build on the card title and make up the bulk of the card's content.</div>
                                            <div className="fs-4">Amount donated: <span className=''><span>&#8377;</span><span>2,000</span></span></div>
                                        </div>
                                    </div>
                                    <div className={`${styles.donatecard} card m-3 mb-5 col-12`} >
                                        <img className="card-img-top" src="/finalogo.png" alt="Card image cap" />
                                        <div className={`${styles.donatecardbody} card-body`}>
                                            <div className="card-text mb-2">Some quick example text to build on the card title and make up the bulk of the card's content.</div>
                                            <div className="fs-4">Amount donated: <span className=''><span>&#8377;</span><span>2,000</span></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.issuebox} col-12 `}>
                                <div className={`${styles.cornerheart}`}><AiFillHeart></AiFillHeart></div>
                                <div className='fs-1 text-black mb-5  d-flex justify-content-center align-items-center fw-bold mt-5'>Your Raises</div>
                                <div className='d-flex justify-content-center align-items-center row'>
                                    <div className={`${styles.issuecard} card m-3 mb-5 col-12`} >
                                        <img className="card-img-top" src="/finalogo.png" alt="Card image cap" />
                                        <div className={`${styles.issuecardbody} card-body`}>
                                            <div className="card-text mb-2">Some quick example text to build on the card title and make up the bulk of the card's content.</div>
                                            <div className="fs-4">Amount donated: <span className=''><span>&#8377;</span><span>2,000</span></span></div>
                                        </div>
                                    </div>
                                    <div className={`${styles.issuecard} card m-3 mb-5 col-12`} >
                                        <img className="card-img-top" src="/finalogo.png" alt="Card image cap" />
                                        <div className={`${styles.issuecardbody} card-body`}>
                                            <div className="card-text mb-2">Some quick example text to build on the card title and make up the bulk of the card's content.</div>
                                            <div className="fs-4">Amount donated: <span className=''><span>&#8377;</span><span>2,000</span></span></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default profile
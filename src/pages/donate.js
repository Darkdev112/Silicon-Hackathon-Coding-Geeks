import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import styles from '../styles/Donate.module.css'
import { GiHealthNormal } from "react-icons/gi"
import { ImBooks } from "react-icons/im"
import { FaEnvira } from "react-icons/fa"
import { FaDog } from "react-icons/fa"
import { CgCommunity } from "react-icons/cg"
import { BsThreeDots } from "react-icons/bs"
import { AiOutlineSearch } from "react-icons/ai"

const Donate = ({ cards }) => {
    const [filter, setFilter] = useState("general");
    const [c,setC] = useState();
    const dayCalc = (prev, days) => {
        const prevobj = new Date(prev)
        const curr = new Date();
        const Difference_In_Time = curr.getTime() - prevobj.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Math.ceil(days - Difference_In_Days);
    }
    useEffect(() => {
      let v = cards.filter((item)=>{
        return filter=="general"? true : (item.category==filter)
      })
      setC(v);
      console.log(c); 
      console.log(filter); 
    }, [filter])
    
    return (
        <>
            <div className={` d-flex flex-column align-items-center justify-content-center container text-center mt-5 p-0 `}>

                <div className={`row ${styles.boxcat} p-1 `}>
                    <div className="col-4 col-lg-2">
                        <div className={` d-flex justify-content-center`}>
                            <div className={`${styles.circlecat} d-flex justify-content-center`} onClick={()=>{setFilter("health")}}>
                                <div className={`${styles.caticon}`}><GiHealthNormal></GiHealthNormal></div>
                            </div>
                        </div>
                        <div className={` d-flex justify-content-center`}>Health</div>
                    </div>
                    <div className="col-4 col-lg-2">
                        <div className="d-flex justify-content-center">
                            <div className={`${styles.circlecat} d-flex justify-content-center`} onClick={()=>{setFilter("education")}}>
                                <div className={`${styles.caticon}`}><ImBooks></ImBooks></div>
                            </div>
                        </div>
                        <div className={` d-flex justify-content-center`}>Education</div>
                    </div>
                    <div className="col-4 col-lg-2 ">
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center">
                                <div className={`${styles.circlecat} d-flex justify-content-center`} onClick={()=>{setFilter("environment")}}>
                                    <div className={`${styles.caticon}`}><FaEnvira></FaEnvira></div>
                                </div>
                            </div>
                        </div>
                        <div className={` d-flex justify-content-center`}>Environment</div>
                    </div>
                    <div className="col-4 col-lg-2">
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center">
                                <div className={`${styles.circlecat} d-flex justify-content-center`} onClick={()=>{setFilter("wildlife")}}>
                                    <div className={`${styles.caticon}`}><FaDog></FaDog></div>
                                </div>
                            </div>
                        </div>
                        <div className={` d-flex justify-content-center`}>Wildlife</div>
                    </div>
                    <div className="col-4 col-lg-2">
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center">
                                <div className={`${styles.circlecat} d-flex justify-content-center`} onClick={()=>{setFilter("community")}}>
                                    <div className={`${styles.caticon}`}><CgCommunity></CgCommunity></div>
                                </div>
                            </div>
                        </div>
                        <div className={` d-flex justify-content-center`}>Community</div>
                    </div>
                    <div className="col-4 col-lg-2">
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center">
                                <div className={`${styles.circlecat} d-flex justify-content-center`} onClick={()=>{setFilter("general")}}>
                                    <div className={`${styles.caticon}`}>< BsThreeDots></ BsThreeDots></div>
                                </div>
                            </div>
                        </div>
                        <div className={` d-flex justify-content-center`}>General</div>

                    </div>
                </div>
                <div className={`input-group d-flex justify-content-center align-items-right  m-3`}>
                    <span className={`${styles.searchbar} form-outline d-flex `}>
                        <input type="search" id="form1" className={`form-control ${styles.searchbarinput}`} placeholder='Search' />
                        <button type="button" className={`${styles.btnsearch} btn btn-primary`}>
                            <AiOutlineSearch></AiOutlineSearch>
                        </button>
                    </span>

                </div>
            </div>
            <div className="container text-center px-0">
                <div className="row">
                    {
                        c?.map((item) => {
                            return (
                                <div className="col col-sm-12 col-md-6 col-lg-4" key={item.slug}>
                                    <div className={`${styles.cent}`}>
                                        <Link href={`/issue/${item.slug}`} className={styles.linkcard}>
                                            <div className={`${styles.card} card p-3`}>
                                                <img src={item.img} className={`${styles.cardimgtop} card-img-top`} alt="..." />
                                                <div className={`${styles.cardbody} card-body p-2`}>
                                                    <div className={`${styles.titletext} card-title fs-4 fw-bold`}>{item.title}</div>
                                                    <div className={`d-flex align-items-center`}><span className={`${styles.bycolor}text-secondary me-2`}>By</span> <span className='fs-5 fw-bold'>{item.user}</span></div>
                                                    <div className={`${styles.days} d-flex align-items-center justify-content-center mb-1`}><span className='text-danger fs-3 mx-1 fw-bolder'>{`${dayCalc(item.createdAt, item.day)} ` }</span><span className='fs-5 text-white'> days left</span></div>
                                                    <div className={`${styles.cardbottom} row d-flex align-items-center justify-content-center`}>
                                                        <div className="col col-4 d-flex align-items-center justify-content-center px-2">
                                                            <div className="skill">
                                                                <div className={`${styles.outer} d-flex align-items-center justify-content-center`} style={{backgroundImage : `conic-gradient(rgba(202, 17, 63, 0.986) 0deg,rgba(202, 17, 63, 0.986) ${Math.floor((item.amountRaised / item.amount) * 100)*3.6}deg, rgba(245, 245, 245, 0.185) ${Math.floor((item.amountRaised / item.amount) * 100)*3.6}deg,rgba(245, 245, 245, 0.185) 360deg`}} >
                                                                    <div className={`${styles.inner} d-flex align-items-center justify-content-center`}>
                                                                        <div className={`${styles.number} text-black`}>
                                                                            {Math.floor((item.amountRaised / item.amount) * 100)}%
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col col-8 text-align-left">
                                                            <div>Raised</div>
                                                            <div><span className="fs-4 fw-bold text-success"><span>&#8377;</span><span>{item.amountRaised}</span></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch("http://localhost:5000/hackathon/card");
    const data = await response.json();
    const allCards = data.info;
    return {
        props: { cards: allCards }, 
    }
}

export default Donate
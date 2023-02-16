import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from "../../styles/IndividualIssue.module.css"
import { AiFillAlert } from "react-icons/ai"
import { SiWhatsapp } from "react-icons/si"
import { RiFacebookFill } from "react-icons/ri"
import { BiDonateHeart } from "react-icons/bi"
import { AiFillHeart } from "react-icons/ai"
import { HiDocumentText } from "react-icons/hi"
import Link from 'next/link'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const Issue = ({ card }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [show, setShow] = useState(false);
  const [payment, setPayment] = useState({
    slug: card.slug,
    amt: 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dayCalc = (prev, days) => {
    const prevobj = new Date(prev)
    const curr = new Date();
    const Difference_In_Time = curr.getTime() - prevobj.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.ceil(days - Difference_In_Days);
  }

  const handlePayment = (e) => {
    setPayment({ ...payment, amt : Number(e.target.value) });
  }

  const makepayment = async () => {
    console.log(payment);
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/hackathon/payer', payment, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const fetched = response.data;
    if (fetched.status == "update") {
      const response2 = await axios.patch('http://localhost:5000/hackathon/payer', payment, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const fetched2 = response2.data;
    }
    const response3 = await axios.patch('http://localhost:5000/hackathon/card', payment, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const fetched3 = response3.data;
  }

  return (
    <>
      <div className="row">
        <div className="left col-lg-3 me-5">
          <Carousel className={`${styles.pics} mt-5`}>
            <Carousel.Item interval={1000}>
              <img
                className={`${styles.pic} d-block w-100`}
                src={card.img}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className={`${styles.pic} d-block w-100`}
                src={card.img}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className={`${styles.pic} d-block w-100`}
                src={card.img}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          <div className={`${styles.rise}`}>
            <div>
              <div className={`${styles.progress} my-4`}>
                <div className={`${styles.outer}`} style={{ backgroundImage: `conic-gradient(rgba(202, 17, 63, 0.986) 0deg,rgba(202, 17, 63, 0.986) ${Math.floor((card.amountRaised / card.amount) * 100) * 3.6}deg, white ${Math.floor((card.amountRaised / card.amount) * 100) * 3.6}deg,white 360deg` }}>
                  <div className={`${styles.inner}`}>{Math.floor((card.amountRaised / card.amount) * 100)}%</div>
                </div>

                <div className={`${styles.raised} my-3 mx-2`}>
                  <h5>Raised</h5>
                  <span><span><span className={`${styles.value}`}>Rs.{card.amountRaised}</span> of Rs.{card.amount}</span></span>
                </div>
              </div>
              <Button className="ms-5" variant="success"><SiWhatsapp></SiWhatsapp> <Link className={styles.linkcard} href="https://web.whatsapp.com/">Share</Link></Button>{' '}
              <Button className="ms-3" variant="primary"><RiFacebookFill></RiFacebookFill><Link className={styles.linkcard} href="https://www.facebook.com/"> Share</Link></Button>{' '}
            </div>
          </div>
        </div>

        <div className="col-lg-8 mt-5 ms-3">
          <div className="row">
            <div className={`${styles.desc} col-lg-8`}>
              <div className={`${styles.h} mt-5`}>
                <h3 className={`${styles.donde}`}>{card.title}</h3>
                <Button className='mt-2 mb-3' variant="danger"><HiDocumentText className='fs-4 mb-1'></HiDocumentText>View Documents</Button>{' '}
              </div>
              <p className={`${styles.dondes}`}>{card.description}</p>
            </div>


            <div className={`${styles.doq} col-lg-4`}>
              <Card className={`${styles.donate}`} style={{ width: '22rem' }}>
                <Card.Body>
                  <div className={`${styles.fline} mt-2`}>
                    <Card.Title><BiDonateHeart className={`${styles.donLogo} mb-1`}></BiDonateHeart> Donate</Card.Title>
                    <Card.Link className='ms-auto fs-6' href="#">998 Supporters</Card.Link>
                  </div><br />
                  <Card.Title className='fs-2'>₹ {card.amountRaised}</Card.Title>
                  <Card.Subtitle className="mb-2 "><span> raised of </span><span className={`${styles.raised} fs-5`}>₹ {card.amount}</span></Card.Subtitle>
                  <ProgressBar striped variant="success" label={`${Math.floor((card.amountRaised / card.amount) * 100)}%`} animated now={Math.floor((card.amountRaised / card.amount) * 100)} />
                  <div className={`${styles.days} mt-2`}>
                    <Card.Title className='fs-4 ms-auto'>{dayCalc(card.createdAt, card.day)}</Card.Title>
                    <Card.Subtitle className=" mt-2 mx-1">days left</Card.Subtitle>
                  </div>
                  <div className={`${styles.dnow}`}>
                    <Button variant="outline-danger" size="lg" className="fs-6" onClick={handleShow}><AiFillHeart className={`${styles.her} fs-5`}></AiFillHeart> DONATE NOW
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Pay to HeartRaiser</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <label className={`${styles.textt} mb-1`} htmlFor=""><span>Enter Amount<span className={`${styles.mand}`}>*</span></span></label><br />
                        <input className={`${styles.labelL}`} type="number" placeholder='Amount' name='amt' onChange={handlePayment} />
                      </Modal.Body>
                      <Modal.Footer>
                        {/* <Button variant="primary" onClick={makepayment}>
                          Save Changes
                        </Button> */}
                        <StripeCheckout
                          stripeKey='pk_test_51Mc4mZSCZZqs4kNxwkltVaJvPSppeT9MfzDbR387odjcu5ftitI8MBxDNaydemRQJQsn2SOcB9Wn1WkGgHNr4hpN00VADCrGhx'
                          label='pay Now'
                          token={makepayment}
                          amount={payment.amt}
                          billingAddress
                          shipingAddress
                        />
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <Card.Subtitle className={`${styles.pay} text-muted mt-3 mx-4`}>Card, Netbanking, Cheque pickups</Card.Subtitle>
                  <div className={`${styles.align}`}>
                    <div className={`${styles.line} mt-3`}></div>
                    <Card.Subtitle className={`${styles.pay} text-muted mt-2 mx-auto`}><span>Or,</span> <span className={`${styles.du}`}>Donate using</span></Card.Subtitle>
                    <div className={`${styles.line} mt-3 ms-auto`}></div>
                  </div>
                  <div className={`${styles.qrc} mt-3`}><Card.Img className={`${styles.qr}`} variant="top" src="/qr.jpg" /></div>
                  <div className={`${styles.scana} mt-2`}>
                    <Card.Subtitle className='text-muted'>
                      Scan & donate with any app
                    </Card.Subtitle>
                  </div>
                  <div className='ms-3 mt-3 mb-3'>
                    <img className={`${styles.pee0} mx-2`} src="/Group 3bhim (1).png" alt="" />
                    <img className={`${styles.pee1} mx-2`} src="/Group 7gpay.png" alt="" />
                    <img className={`${styles.pee1} mx-2`} src="/Group 5phonepe.png" alt="" />
                    <img className={`${styles.pee2} mx-2`} src="/Group 8paytm.png" alt="" />
                    <img className={`${styles.pee3} mx-2`} src="/Group 9pay.png" alt="" />
                  </div>
                </Card.Body>
              </Card>
            </div>


          </div>
        </div>
      </div>

      <br /><br />
    </>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:5000/hackathon/card");
  const data = await response.json();
  const allCards = data.info;
  const card = allCards.filter((item) => {
    return item.slug == context.params.slug;
  });
  return {
    props: { card: card[0] },
  }
}

export default Issue;
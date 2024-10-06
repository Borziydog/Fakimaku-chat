"use client"
import Image from "next/image";
import styles from "./mainpage.module.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });

  },[])
  return (

    <div className={styles.mainpage}>
    <div className={styles.mainblock}>
      <img src="./assets/screen.png" />
      <div className={styles.info}>
        <h1 className="">Fakimaku Chat</h1>
        <h2 className="">Месенджер для тех, кто ценит и любит общение</h2>
        <button className={styles.enterbutton}>Начать общение!</button>
      </div>
    </div>
    <div className={styles.infocontainter}>
      <h2>Почему именно мы?</h2>
      
      <div className={styles.infoblock} data-aos="fade-right">
        <div>
          <h3>Безопасность на первом месте</h3>
          <h4>Мы понимаем, как важна ваша конфиденциальность. Наш мессенджер использует передовые технологии шифрования, чтобы ваши сообщения оставались только между вами и вашими собеседниками.</h4>
        </div>
        <img src="./assets/lock.png" />
      </div>

      <div className={styles.infoblock} data-aos="fade-left">
      <img src="./assets/send.png" />
        <div>
          <h3>Мгновенные сообщения</h3>
          <h4>Забудьте о задержках! Мы гарантируем быструю доставку сообщений, чтобы вы могли оставаться на связи в любое время и в любом месте.</h4>
        </div>
      </div>

      <div className={styles.infoblock} data-aos="fade-right">
        <div>
            <h3>Постоянное развитие</h3>
            <h4>Мы активно работаем над улучшением нашего сервиса, прислушиваясь к вашим отзывам и внедряя новые функции, чтобы сделать общение еще более удобным и приятным.</h4>
        </div>
        <img src="./assets/up_1.png" />
      </div>
    </div>
    <div className={styles.footer}>
      <h2>Выбор очевиден - <strong>Fakimaku Chat</strong></h2>
      <button className={styles.enterbutton}>Начать общение!</button>
    </div>
    </div>

  );
}

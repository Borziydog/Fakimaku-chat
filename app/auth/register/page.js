import Image from "next/image";
import styles from "../auth.module.css";
export default function App() {
  return (
    <div>
      <div className={styles.authcontainter}>
        <div className={styles.authinside}>
        
          <div className={styles.FlexCont}>
            <form >
              <h1>Fakimaku Chat</h1>
              <h2>Добро пожаловать в наши ряды</h2>
              <div className={styles.input}>
                  <h4>Никнейм</h4>
                  <input required  type="text" />
                  <hr />
              </div>
              <div className={styles.input}>
                  <h4>Email</h4>
                  <input type="email" required />
                  <hr />
              </div>
              <div className={styles.input}>
                  <h4>Пароль</h4>
                  <input type="password" required />
                  <hr />
              </div>
              <div className={styles.input}>
                  <h4>Повторите пароль</h4>
                  <input  type="password" required />
                  <hr />
              </div>
              <h5>Забыли пароль? <a>Мы вам поможем</a></h5>
              <h5>У вас уже есть аккаунт? <a>Вход</a></h5>
              <button type="submit" className={styles.enterbutton}>Регистрация</button>
            </form>
            <div className={styles.NewsContainer}>
              <h2>Что нового?</h2>
              <div className={styles.NewsCardscontainter}>
                <div className={styles.NewsCard}>
                  <img src="/assets/new_news.png" />
                  <h3>Полный ребрендинг сайта</h3>
                  <h4>Обновленный дизайн сообщений и более оптимизированная веб версия</h4>
                </div>
                <div className={styles.NewsCard}>
                  <img src="/assets/new_news.png" />
                  <h3>Полный ребрендинг сайта</h3>
                  <h4>Обновленный дизайн сообщений и более оптимизированная веб версия</h4>
                </div>
                <div className={styles.NewsCard}>
                  <img src="/assets/new_news.png" />
                  <h3>Полный ребрендинг сайта</h3>
                  <h4>Обновленный дизайн сообщений и более оптимизированная веб версия</h4>
                </div>
                <div className={styles.NewsCard}>
                  <img src="/assets/new_news.png" />
                  <h3>Полный ребрендинг сайта</h3>
                  <h4>Обновленный дизайн сообщений и более оптимизированная веб версия</h4>
                </div>
                <div className={styles.NewsCard}>
                  <img src="/assets/new_news.png" />
                  <h3>Полный ребрендинг сайта</h3>
                  <h4>Обновленный дизайн сообщений и более оптимизированная веб версия</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

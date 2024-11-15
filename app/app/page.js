import Image from "next/image";
import styles from "./app.module.scss"
import "bootstrap-icons/font/bootstrap-icons.css"
export default function App() {
  return (        
        <div className={styles.App}>
          <div className={styles.left_tab}>
              {/* <h4>FC</h4> */}

              <div className={styles.servers}>
                <div className={styles.servercard}>
                  <img src="https://freelance.ru/img/portfolio/pics/00/3D/BF/4046683.jpg"/>
                </div>
              </div>
              <div className={styles.tooltab}>
                <img src="./assets/add.svg"></img>
                <div className={styles.tools}>
                  <i className="bi bi-bell-fill"></i>
                  <i className="bi bi-people-fill"></i>
                  <i className="bi bi-gear-fill"></i>
                </div>
                <div className={styles.avatar}>
                    <img src="https://amvet.ru/wp-content/uploads/2023/07/pochemu-sobaka-chasto-pisaet-1-scaled.webp"/>
                </div>
              </div>
          </div>
          <div className={styles.server_chats}>
            <div className={styles.server_info}>
              <img src="https://freelance.ru/img/portfolio/pics/00/3D/BF/4046683.jpg" />
              <h2>Сервер Borziy...</h2>
              <i className="bi bi-caret-down-fill"></i>
            </div>
            <div className={styles.chat_container}>
              <div className={styles.chat_category}>
                <h2>Информация</h2>
                <div className={styles.chat}>
                 <img src="./assets/hashtag_dark.svg" /><h3>Оповещения</h3>
                </div>
                <div className={styles.chat}>
                 <img src="./assets/hashtag_dark.svg" /><h3>Оповещения</h3>
                </div>
                <div className={styles.chat}>
                 <img src="./assets/hashtag_dark.svg" /><h3>Оповещения</h3>
                </div>
              </div>
              <div className={styles.chat_category}>
                <h2>Информация</h2>
                <div className={styles.chat}>
                 <img src="./assets/hashtag_dark.svg" /><h3>Оповещения</h3>
                </div>
                <div className={styles.chat}>
                 <img src="./assets/hashtag_dark.svg" /><h3>Оповещения</h3>
                </div>
                <div className={styles.chat}>
                 <img src="./assets/hashtag_dark.svg" /><h3>Оповещения</h3>
                </div>
              </div>
            </div>
            <div className={styles.user_profile}>
              <div className={styles.user_data}>
                <h4>Borziydog</h4>
                <h5>@borzzziyyyydoog</h5>
              </div>
              <div className={styles.controls}>
                {/* <i className="bi bi-mic-fill"></i>
                <i className="bi bi-headphones"></i> */}
              </div>
            </div>
          </div>
          <div className={styles.server_chat}>
            <div className={styles.messages_slider}>
                  <div className={styles.message_container}>
                      <div className={styles.message}>
                          <div className={styles.message_info}>
                            <img src="https://amvet.ru/wp-content/uploads/2023/07/pochemu-sobaka-chasto-pisaet-1-scaled.webp" />
                            <h3>Borziydog</h3>
                            <h4>17:23</h4>
                          </div>
                          <div className={styles.message_content}>
                            <h2>Собаки не жрут своё говно!</h2>
                          </div>
                      </div>
                  </div>
                   
            </div>
            <div className={styles.textarea}>
                <textarea placeholder="Напиши что нибудь уже"></textarea>
                <i className="bi bi-send-fill"></i>
            </div>
          </div>
          <div className={styles.server_info}>
            <div className={styles.find_user}>
                <textarea placeholder="Поиск человека (или нет)"></textarea>
                <i class="bi bi-search"></i>

            </div>
            <div className={styles.online_users}>
              <div className={styles.role_group}>
                <div className={styles.role_groupname}>
                  <h2>Владелец</h2><h3>1</h3>
                </div>
                <div className={styles.profile}>
                <div className={styles.avatar}>
                  <img src="https://amvet.ru/wp-content/uploads/2023/07/pochemu-sobaka-chasto-pisaet-1-scaled.webp" />
                  <div className={styles.sleep}>

                  </div>
                </div>
                <div>
                  <h3>Borziydog</h3>
                  <h4>Играет в Satisfactory</h4>
                </div>
                <div className={styles.badge}>
                  
                </div>
                </div>
              </div>
              <div className={styles.role_group}>
                <div className={styles.role_groupname}>
                  <h2>Админ</h2><h3>1</h3>
                </div>
                <div className={styles.profile}>
                <div className={styles.avatar}>
                  <img src="https://amvet.ru/wp-content/uploads/2023/07/pochemu-sobaka-chasto-pisaet-1-scaled.webp" />
                  <div className={styles.online}>

                  </div>
                </div>
                <div>
                  <h3>ArtemPro3000</h3>
                  <h4>Играет в Satisfactory</h4>
                </div>
                <div className={styles.online}>
                  
                </div>
                </div>
                <div className={styles.profile}>
                  <div className={styles.avatar}>
                    <img src="https://amvet.ru/wp-content/uploads/2023/07/pochemu-sobaka-chasto-pisaet-1-scaled.webp" />
                    <div className={styles.dnd}>

                    </div>
                  </div>
                  <div>
                    <h3>GamikSuper</h3>
                    <h4>Играет в Satisfactory</h4>
                  </div>
                  <div className={styles.online}>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
            
        </div>
    );
}

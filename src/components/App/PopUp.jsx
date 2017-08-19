import React from 'react';
import styles from './styles.scss';

function closePopUp(e) {
  if(e.target.id === 'modal') {
    e.target.remove();
  }
}

const PopUp = () => {
  return (
    <div id='modal' className={styles.popUp} onClick={closePopUp}>
      <div className={styles.window}>
        <iframe src='https://www.youtube.com/embed/Anyylln8RRQ' frameBorder='0' allowFullScreen autoPlay/>
        <h2>Aftermovie of our lovely day!</h2>
        <span className={styles.MadeBy}>Made by Mattheo van de Tuuk</span>
        <p>Hartelijk dank voor al jullie liefde en gezelligheid! Wij hebben ontzettend genoten! Heb je foto's van onze speciale dag, graag willen wij deze van jullie ontvangen via een van de volgende kanalen:</p>
        <div className={styles.share}>
          <a href='https://goo.gl/photos/HkzmF7vQy14TWpibA' target='_blank' title='Google photos' className={styles.platform}>
            <img src={require('../../images/google-plus.svg')} alt='Google icon'/>
          </a>
          <a href='https://api.whatsapp.com/send?phone=31641577665' target='_blank' title='Whatsapp' className={styles.platform}>
            <img src={require('../../images/whatsapp.svg')} target='_blank' alt='Whatsapp icon'/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
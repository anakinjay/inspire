import React, { Component } from 'react'
import { connect } from 'react-redux'
import {IonIcon, IonLabel, IonButton, IonCardContent, IonCard, IonItem, IonSlides, IonSlide, IonContent} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { play, personCircle, map, informationCircle } from 'ionicons/icons';
import * as Tone from 'tone';

export const NumeralCard = (props) => {
  
    return (
        
        <IonSlide className={props.hidden}>
    
               <IonCard>
          <IonItem>
            <IonIcon onClick={(e)=>{
                
               
                const synth = new Tone.Synth().toDestination();

                synth.triggerAttackRelease(props.note+"3", "8n");
          

                
                }} icon={play}  slot="start" />
            <IonLabel>{props.label}</IonLabel>
            <IonButton fill="outline" slot="end">{props.symbol}</IonButton>
          </IonItem>
 
          <IonCardContent>
            {props.desc}
      </IonCardContent>
        </IonCard>
  
        </IonSlide>
 
    )
}

const mapStateToProps = (state) => ({
    ...state
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(NumeralCard)

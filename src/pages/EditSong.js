/* eslint-disable react-hooks/exhaustive-deps */
import { IonButtons, IonCol, IonGrid, IonRow, IonSlide, IonSlides, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React, {useRef, useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import NumeralCard from "../components/numeralCard/numeralCard"
import { connect } from 'react-redux'
import storage from "../state/storage";

const EditSong = (props) => {
 

  const [ncards, setNcards] = useState([]);
  useEffect( () => {
    console.log("UF  SONG STARTING");
    let nlist = props.scale.major.map((item, index)=>{
      if (index != 0) {
     
      let hidden = "hidden";
      if (props.scale.targetChords.includes(index)) {
          hidden = "not_hidden";
      }
        return <NumeralCard key={"nc"+index} 
        note={props.scale.keyshift[item.pos]} 
        symbol={item.symbol}
        label={item.label}
        desc={item.description}
        hidden={hidden}



        />;
      }
        
    }
       );
 

       let ncardslider = <IonSlides onIonSlideDidChange={
       
      

           async (e)=>{ props.setChordSlide(await e.currentTarget.getActiveIndex() )}


       } >{nlist}</IonSlides>

       setNcards(ncardslider);


  },[props.scale] );
 
    

       

  let songCards = props.scale.song.map((item, index)=>{
    
    return <IonCol  key={"ic"+index}  >{props.scale.chords[item-1]}{" "}{props.scale.major[item].symbol}</IonCol>
  });

  return (
        <IonContent>
         <IonGrid>
      <IonRow>
          {songCards}
          </IonRow>
          </IonGrid>
 
            {ncards}
         

          <IonButton  expand={"block"} color="primary" onClick={()=>props.addChord()} >Add Chord</IonButton>
          <IonButton  expand={"block"} color="warning" onClick={()=>props.scale.play()} >Play Song</IonButton>
          <IonButton  expand={"block"} color="success" onClick={()=>{

          storage.saveSong(props.scale.name, props.scale);
          
          }} >Save Song</IonButton>
    
      </IonContent>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    addChord: (payload) => {
   
      
      dispatch({ type: 'ADDCHORD', payload: payload }
      
      );},
    setChordSlide: (payload) => dispatch({ type: 'SETCHORDSLIDE', payload: payload }),
    reset: () => dispatch({ type: 'RESET' })
  }
}

const mapStateToProps = (state) => ({ scale: state.scale })
export default connect(mapStateToProps, mapDispatchToProps)(EditSong);

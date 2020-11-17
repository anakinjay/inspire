/* eslint-disable react-hooks/exhaustive-deps */
import { IonList, IonItem, IonLabel,  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, {Suspense, Fragment, useEffect, useState} from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import storage from '../state/storage';
import { connect } from 'react-redux'







const LoadSong =  (props) => {

  const [songs, setSongs] = useState("");
  useEffect( () => {
    (async () => {
      const result = await storage.loadAllSongs();
      setSongs(result)
  })();

   
  },[] );



  return (<IonList>
{Object.keys(songs).map((key)=>{
  
  return <IonItem key={key} onClick={(e)=>{

    props.loadSong(songs[key]);
  
  }}><IonLabel>{songs[key].name}</IonLabel></IonItem>
  
})}
</IonList>
  );
};



const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    loadSong: (payload) => {
   
      
      dispatch({ type: 'LOADSONG', payload: payload }
      
      );},
    setChordSlide: (payload) => dispatch({ type: 'SETCHORDSLIDE', payload: payload }),
    reset: () => dispatch({ type: 'RESET' })
  }
}

const mapStateToProps = (state) => ({ scale: state.scale })
export default connect(mapStateToProps, mapDispatchToProps)(LoadSong);

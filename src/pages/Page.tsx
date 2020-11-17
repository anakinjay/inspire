import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { readTask } from 'ionicons/dist/types/stencil-public-runtime';
import React from 'react';
import { connect } from 'react-redux'

import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import EditSong from './EditSong'
import NewSong from './NewSong'
import LoadSong from './LoadSong'

const Page: React.FC = (props: any) => {


  let content = <></>;

  switch (props.scale.page) {
    case "New Song":
      content = <NewSong />
      break;
    case "Load Song":
      content = <LoadSong />
      break;
    case "Edit Song":

      content = <EditSong />
      break;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{props.scale.page}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{props.scale.page}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {content}
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    // dispatching plain actions
    addChord: (payload: any) => {dispatch({ type: 'ADDCHORD', payload: payload });},
    setChordSlide: (payload: any) => dispatch({ type: 'SETCHORDSLIDE', payload: payload }),
    reset: () => dispatch({ type: 'RESET' })
  }
}

const mapStateToProps = (state:  any) => ({ scale: state.scale })
export default connect(mapStateToProps, mapDispatchToProps)(Page);

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


let exstore = {};
// JSON "set" example
 exstore.setObject = async () =>{
  await Storage.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON "get" example
exstore.getObject = async (name)=> {
    name = name.split(' ').join('_');
  const ret = await Storage.get({ key: 'songs' });
  const song = JSON.parse(ret.value)[name];
}

exstore.saveSong = async (name, state)=> {
    name = name.split(' ').join('_');
    const ret = await Storage.get({ key: 'songs' });
  
    if (ret.value == null) {
        ret.value = {};
    } else {
        ret.value = JSON.parse(ret.value);
    }
   
    ret.value[name] = state;
    console.log("RET IS", ret);
    await Storage.set({
        key: 'songs',
        value: JSON.stringify(ret.value)
      });
}
exstore.loadSong = async (name)=> {
    
}
exstore.loadAllSongs = async () => {
    const ret = await Storage.get({ key: 'songs' });
    return JSON.parse(ret.value);
}

// JSON "get" example
exstore.getState = async ()=> {
    const ret = await Storage.get({ key: 'inspiration_state' });
 
    console.log("STATE FROM STORAGE: ",JSON.parse(ret.value));
    return ret.value;
  }

exstore.setState = async (state) => {
    await Storage.set({
      key: 'inspiration_state',
      value: JSON.stringify(state)
    });
  }
  

exstore.setItem = async () => {
  await Storage.set({
    key: 'name',
    value: 'Max'
  });
}

exstore.getItem = async () => {
  const { value } = await Storage.get({ key: 'name' });
  console.log('Got item: ', value);
}

exstore.removeItem = async () => {
  await Storage.remove({ key: 'name' });
}

exstore.keys = async ()=> {
  const { keys } = await Storage.keys();
  console.log('Got keys: ', keys);
}

exstore.clear = async () => {
  await Storage.clear();
}

export default exstore;
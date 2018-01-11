import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import BasicBackground from '../Modules/BasicBackground2';

import MyStatusBar from '../Modules/StatusBar.js';
import BasicTextInput from '../Modules/BasicTextInput.js';
import BasicButton from '../Modules/BasicButton.js';
import CenterContentWrapper from '../Modules/CenterContentWrapper';

export default class Song extends Component {
  constructor(props){
    super(props);
    var self = this;
    self.state = {
      song: `This was a triumph!
I'm making a note here:
Huge success!

It's hard to overstate
my satisfaction.

Aperture Science:
We do what we must
because we can
For the good of all of us.
Except the ones who are dead.

But there's no sense crying
over every mistake.
You just keep on trying
'til you run out of cake.
And the science gets done.
And you make a neat gun
for the people who are
still alive.

I'm not even angry...
I'm being so sincere right now.
Even though you broke my heart,
and killed me.

And tore me to pieces.
And threw every piece into a fire.
As they burned it hurt because
I was so happy for you!

Now, these points of data
make a beautiful line.
And we're out of beta.
We're releasing on time!
So I'm GLaD I got burned!
Think of all the things we learned!
for the people who are
still alive.

Go ahead and leave me...
I think I'd prefer to stay inside...
Maybe you'll find someone else
to help you.
Maybe Black Mesa?
That was a joke. Ha Ha. Fat Chance!

Anyway this cake is great!
It's so delicious and moist!

Look at me: still talking
when there's science to do!
When I look out there,
it makes me glad I'm not you.

I've experiments to run.
There is research to be done.
On the people who are
still alive.
And believe me I am
still alive.
I'm doing science and I'm
still alive.
I feel fantastic and I'm
still alive.
While you're dying I'll be
still alive.
And when you're dead I will be
still alive

Still alive.

Still alive.`,
      step: 0,
    }

    self.renderSong = self.renderSong.bind(self);
    self.increaseStep = self.increaseStep.bind(self);
    self.increaseStep();
  }

  increaseStep(){
    var self = this;
    if(self.state.song.length > self.state.step){
      var _char = self.state.song[self.state.step];

      if(_char === '\n'){
        setTimeout(function(){
          self.setState({
            step: self.state.step + 1,
          });
          self.increaseStep();
        }, 100 + Math.floor(Math.random()*200));
      } else {
        setTimeout(function(){
          self.setState({
            step: self.state.step + 1,
          });
          self.increaseStep();
        }, 10 + Math.floor(Math.random()*20));
      }
    }
  }

  renderSong(){
    var self = this;

    return (
      <CenterContentWrapper style={{flex:1, transform: [{ rotate: '180deg'}]}}>
        <Text style={{color:'white', alignSelf:'stretch', textAlign:'center', transform: [{ rotate: '180deg'}]}}>{self.state.song.substring(0, self.state.step)}</Text>
      </CenterContentWrapper>
    );
  }

  render() {
    var self = this;
    return (
      <BasicBackground>
        {self.renderSong()}
        <BasicButton title={"Back"}
                     disabled={false}
                     style={{margin: 15, }}
                     buttonStyle={{width: global.device.width - 20, maxWidth:200,}}
                     titleStyle={{color:'gray', fontSize: 16,}}
                     onPress={function(){ Actions.pop(); }}/>
      </BasicBackground>
    );
  }
}

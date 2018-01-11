import React, { Component } from 'react';
import {  View, ScrollView, } from 'react-native';

export default class CenterContentWrapper extends Component {
  constructor(props){
    super(props);
  }

  render(){
    var self = this;
    return(
      <ScrollView ref={ref => self.scrollView = ref}
                  contentContainerStyle={{flexGrow: 1, flexDirection: 'column', justifyContent: 'center',}}
                  onContentSizeChange={(contentWidth, contentHeight)=>{        
                      this.scrollView.scrollToEnd({animated: true});
                  }}>
        <View style={[{justifyContent: 'center', alignItems: 'center',}, self.props.style]}>
          {self.props.children}
        </View>
      </ScrollView>
    );
  }
}

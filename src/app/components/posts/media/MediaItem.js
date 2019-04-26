import React, { Component } from 'react'
import ImageMedia from './ImageMedia';

const { IMAGE, VIDEO } = require('../../../../utils/enums/media-types')

class MediaItem extends Component {

    render() {
        const { media, loading } = this.props.media
        let mediaContent
       if(loading)
            mediaContent = <div></div>
        else if(media && media.url)
            switch(media){
                case IMAGE:
                    mediaContent = <ImageMedia url={media.url}/>
                    break 
            } 
            
        return (
            { mediaContent }
        )
    }

}

export default MediaItem
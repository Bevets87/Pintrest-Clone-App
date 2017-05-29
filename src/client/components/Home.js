import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Box from 'grommet/components/Box'
import Columns from 'grommet/components/Columns'
import Image from 'grommet/components/Image'
import Paragraph from 'grommet/components/Paragraph'
import Button from 'grommet/components/Button'
import FavoriteIcon from 'grommet/components/icons/base/Favorite'
import Animate from 'grommet/components/Animate'

class Home extends Component {
  constructor (props) {
    super (props)
  }
  render () {
    const { photos } = this.props
    return (
      <Animate enter={{'animation': 'slide-right', 'duration': 300, 'delay': 0}} keep={true}>
        <Box flex={true}>
        {photos.length > 0 &&
          <Columns style={{'width':'95%', 'margin':'25px auto', 'background':'rgba(100,100,100,0.1)','border':'1px solid rgba(0,0,0,0.4)','borderRadius':'10px'}}  justify='between' masonry={true} maxCount={3} size='medium'  >
            {photos.map(photo => {
              return (
                <Box style={{'border':'2px solid rgb(134,92,214)','borderRadius':'10px'}} margin='small' wrap={true} key={photo._id} colorIndex='light-2' >
                  <Box justify='start' direction='row'>
                    <Image size='thumb' src={photo.owner.displayPhoto} />
                    <Paragraph style={{'fontWeight':'bold','margin':'10px auto', 'padding':'0'}} size='large'>{photo.owner.username}</Paragraph>
                  </Box>
                  <Box>
                    <Image src={photo.url} full={true} fit='contain' />
                  </Box>
                  <Box>
                    <Paragraph style={{'padding': '0', 'margin':'0 auto'}}size='large'>{photo.text}</Paragraph>
                    <Button className='like-photo-button' icon={<FavoriteIcon/>} label={photo.likes.length.toString()} primary={false} secondary={false} accent={false} />
                  </Box>
                </Box>
              )
            })}
          </Columns>
          }
        </Box>
      </Animate>
    )
  }
}

Home.propTypes = {
  photos: PropTypes.array
}

const mapStateToProps = (state) => {
  const { photos } = state.photoReducer
  return {
    photos
  }
}
export default connect(mapStateToProps)(Home)
